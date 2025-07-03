import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

interface NCWalletTransaction {
    status: string;
    service: string;
    ref_id: string;
    title: string;
    oldbal: string;
    amount: string;
    discount_charges: string;
    newbal: string;
    message: string;
    datetime: string;
}

const parseNCWalletAmount = (amountStr: string): number => {
    return parseFloat(amountStr.replace(/[₦,]/g, ''));
};

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const cutoffTime = new Date(Date.now() - 10 * 60 * 1000);

        const pendingTransactionsRef = adminDb.collection('pendingTransactions');
        const pendingQuery = pendingTransactionsRef
            .where('status', 'in', ['processing', 'verifying'])
            .where('createdAt', '<', cutoffTime);

        const pendingSnapshot = await pendingQuery.get();

        if (pendingSnapshot.empty) {
            return NextResponse.json({
                message: 'No pending transactions to process',
                processed: 0
            });
        }

        const response = await fetch("https://ncwallet.africa/api/v1/user/transactions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                trnx_pin: process.env.NCWALLET_TRNX_PIN!,
                Authorization: process.env.NCWALLET_API_KEY!,
            },
        });

        if (!response.ok) {
            console.error("❌ Failed to fetch NCWallet transactions for cleanup");
            return NextResponse.json({ message: 'Failed to fetch provider transactions' }, { status: 500 });
        }

        const data = await response.json();
        const transactions: NCWalletTransaction[] = data.data_list || [];

        let processed = 0;

        for (const doc of pendingSnapshot.docs) {
            const pendingTransaction = doc.data();
            const { userId, transactionId, amount, phoneNumber, networkId, planId, startTime } = pendingTransaction;

            const matchingTransaction = transactions.find(transaction => {
                const transactionAmount = parseNCWalletAmount(transaction.amount);
                const transactionDate = new Date(transaction.datetime);
                const afterTime = new Date(startTime);
                const isDataService = transaction.service === "data";
                const isSuccessful = transaction.status === "successful";
                const isAfterTimestamp = transactionDate > afterTime;
                const amountMatches = Math.abs(transactionAmount - amount) < 1;
                const phoneMatches = transaction.message.includes(phoneNumber.slice(-4));

                return isDataService && isSuccessful && isAfterTimestamp && amountMatches && phoneMatches;
            });

            if (matchingTransaction) {
                const walletRef = adminDb.doc(`users/${userId}/wallets/utilities`);
                const transactionRef = adminDb.doc(
                    `users/${userId}/wallets/utilities/transactions/${transactionId}`
                );

                const batch = adminDb.batch();

                batch.update(walletRef, {
                    balance: FieldValue.increment(-amount),
                    lastUpdated: FieldValue.serverTimestamp(),
                });

                batch.set(transactionRef, {
                    amount,
                    description: `Data purchase for ${phoneNumber}`,
                    paymentMethod: "wallet",
                    reference: matchingTransaction.ref_id,
                    status: "success",
                    timestamp: FieldValue.serverTimestamp(),
                    transactionId,
                    type: "debit",
                    metadata: {
                        service: "data",
                        recipient: phoneNumber,
                        networkId,
                        planId,
                        providerResponse: {
                            ref_id: matchingTransaction.ref_id,
                            message: matchingTransaction.message
                        },
                        verified: true,
                        cleanupProcessed: true,
                    },
                });

                batch.update(doc.ref, {
                    status: 'completed',
                    walletDebited: true,
                    cleanupProcessedAt: FieldValue.serverTimestamp()
                });

                await batch.commit();
                processed++;

                console.log("✅ Cleanup processed transaction", {
                    transactionId,
                    ncWalletRef: matchingTransaction.ref_id
                });
            } else {
                await doc.ref.update({
                    status: 'failed',
                    failedAt: FieldValue.serverTimestamp(),
                    reason: 'No matching transaction found in cleanup'
                });
                processed++;

                console.log("❌ Cleanup failed transaction", {
                    transactionId,
                    reason: 'No matching transaction found'
                });
            }
        }

        return NextResponse.json({
            message: `Processed ${processed} pending transactions`,
            processed
        });

    } catch (error) {
        console.error("❌ Cleanup process failed", error);
        return NextResponse.json({
            message: 'Cleanup process failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}