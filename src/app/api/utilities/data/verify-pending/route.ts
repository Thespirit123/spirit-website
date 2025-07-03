import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

interface NCWalletTransaction {
    status: string;
    service: string;
    ref_id: string;
    amount: string;
    message: string;
    datetime: string;
}

const parseNCWalletAmount = (amountStr: string): number => {
    return parseFloat(amountStr.replace(/[₦,]/g, ''));
};

const parseNCWalletDateTime = (datetimeStr: string): Date => {
    const cleanDatetime = datetimeStr.replace(/(\d{4}-\d{2}-\d{2}) (\d{1,2}:\d{2}:\d{2}) (AM|PM)/, '$1 $2 $3');
    return new Date(cleanDatetime);
};

export async function POST(req: NextRequest) {
    const authorization = req.headers.get("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const idToken = authorization.split("Bearer ")[1];
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const userId = decodedToken.uid;

        const cutoffTime = new Date(Date.now() - 10 * 60 * 1000);

        const pendingTransactionsRef = adminDb.collection('pendingTransactions');
        const pendingQuery = pendingTransactionsRef
            .where('userId', '==', userId)
            .where('status', 'in', ['processing', 'verifying']);

        const pendingSnapshot = await pendingQuery.get();

        if (pendingSnapshot.empty) {
            return NextResponse.json({
                message: 'No pending transactions to process',
                processed: 0
            });
        }

        const recentTransactions = pendingSnapshot.docs.filter(doc => {
            const data = doc.data();
            const createdAt = data.createdAt?.toDate();
            return createdAt && createdAt > cutoffTime;
        });

        if (recentTransactions.length === 0) {
            return NextResponse.json({
                message: 'No recent pending transactions to process',
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
            throw new Error('Failed to fetch provider transactions');
        }

        const data = await response.json();

        if (data.status !== "success") {
            throw new Error('Provider API returned error');
        }

        const allTransactions: NCWalletTransaction[] = data.data_list || [];
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        const recentNCWalletTransactions = allTransactions
            .filter(transaction => {
                const transactionDate = parseNCWalletDateTime(transaction.datetime);
                return transactionDate > oneHourAgo;
            })
            .sort((a, b) => {
                const dateA = parseNCWalletDateTime(a.datetime);
                const dateB = parseNCWalletDateTime(b.datetime);
                return dateB.getTime() - dateA.getTime();
            });

        let processed = 0;

        for (const doc of recentTransactions) {
            const pendingTransaction = doc.data();
            const { transactionId, amount, phoneNumber, networkId, planId, startTime } = pendingTransaction;

            const matchingTransaction = recentNCWalletTransactions.find(transaction => {
                const transactionAmount = parseNCWalletAmount(transaction.amount);
                const transactionDate = parseNCWalletDateTime(transaction.datetime);
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
                        backgroundProcessed: true,
                    },
                });

                batch.update(doc.ref, {
                    status: 'completed',
                    walletDebited: true,
                    backgroundProcessedAt: FieldValue.serverTimestamp()
                });

                await batch.commit();
                processed++;
            } else {
                await doc.ref.update({
                    verificationAttempts: FieldValue.increment(1)
                });
            }
        }

        return NextResponse.json({
            message: `Processed ${processed} pending transactions`,
            processed
        });

    } catch (error) {
        return NextResponse.json({
            message: 'Verification failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}