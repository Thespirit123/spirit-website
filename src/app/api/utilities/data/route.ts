import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

interface NCWalletResponse {
    status: string;
    message: string;
    data?: {
        reference?: string;
        [key: string]: unknown;
    };
}

interface PendingTransaction {
    userId: string;
    transactionId: string;
    amount: number;
    phoneNumber: string;
    networkId: string;
    planId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'verifying';
    createdAt: FirebaseFirestore.Timestamp;
    ncWalletCalled: boolean;
    ncWalletResponse?: string;
    walletDebited: boolean;
    verificationAttempts: number;
    startTime: string;
}

const processWalletDebit = async (
    userId: string,
    transactionId: string,
    amount: number,
    phoneNumber: string,
    networkId: string,
    planId: string,
    providerReference: string,
    providerMessage: string
) => {
    console.log(`[${transactionId}] Processing wallet debit for user ${userId}`);

    const walletRef = adminDb.doc(`users/${userId}/wallets/utilities`);
    const transactionRef = adminDb.doc(
        `users/${userId}/wallets/utilities/transactions/${transactionId}`
    );
    const pendingTransactionRef = adminDb.doc(`pendingTransactions/${transactionId}`);

    const batch = adminDb.batch();

    batch.update(walletRef, {
        balance: FieldValue.increment(-amount),
        lastUpdated: FieldValue.serverTimestamp(),
    });

    batch.set(transactionRef, {
        amount,
        description: `Data purchase for ${phoneNumber}`,
        paymentMethod: "wallet",
        reference: providerReference,
        status: "success",
        timestamp: FieldValue.serverTimestamp(),
        transactionId,
        type: "debit",
        metadata: {
            service: "data",
            recipient: phoneNumber,
            networkId,
            planId,
            providerResponse: { reference: providerReference, message: providerMessage },
            verified: true,
        },
    });

    batch.update(pendingTransactionRef, {
        status: 'completed',
        walletDebited: true,
        completedAt: FieldValue.serverTimestamp()
    });

    await batch.commit();
    console.log(`[${transactionId}] Wallet debit completed successfully`);
};

export async function POST(req: NextRequest) {
    const authorization = req.headers.get("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let transactionId: string | null = null;
    let userId: string | null = null;

    try {
        const idToken = authorization.split("Bearer ")[1];
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        userId = decodedToken.uid;

        console.log(`Data purchase initiated for user: ${userId}`);

        const requestBody = await req.json();
        const { networkId, planId, phoneNumber, amount } = requestBody;

        if (!networkId || !planId || !phoneNumber || !amount) {
            console.log(`Invalid request parameters for user: ${userId}`);
            return NextResponse.json(
                { message: "Invalid request parameters" },
                { status: 400 }
            );
        }

        const walletRef = adminDb.doc(`users/${userId}/wallets/utilities`);
        const walletDoc = await walletRef.get();
        const walletBalance = walletDoc.data()?.balance || 0;

        if (!walletDoc.exists || walletBalance < amount) {
            console.log(`Insufficient balance for user: ${userId}, balance: ${walletBalance}, required: ${amount}`);
            return NextResponse.json(
                { message: "Insufficient wallet balance" },
                { status: 400 }
            );
        }

        transactionId = `data_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        const startTime = new Date();

        console.log(`[${transactionId}] Created transaction for ${phoneNumber}, amount: ${amount}`);

        const pendingTransactionRef = adminDb.doc(`pendingTransactions/${transactionId}`);

        const pendingTransaction: PendingTransaction = {
            userId,
            transactionId,
            amount,
            phoneNumber,
            networkId,
            planId,
            status: 'pending',
            createdAt: FieldValue.serverTimestamp() as FirebaseFirestore.Timestamp,
            ncWalletCalled: false,
            walletDebited: false,
            verificationAttempts: 0,
            startTime: startTime.toISOString(),
        };

        await pendingTransactionRef.set(pendingTransaction);
        console.log(`[${transactionId}] Pending transaction saved`);

        await pendingTransactionRef.update({
            status: 'processing',
            ncWalletCalled: true,
        });
        console.log(`[${transactionId}] Status updated to processing`);

        const ncWalletPayload = {
            network: networkId,
            data_plan: planId,
            phone_number: phoneNumber,
            country_code: "NG",
            bypass: true,
        };

        console.log(`[${transactionId}] NCWallet API payload:`, JSON.stringify(ncWalletPayload, null, 2));
        console.log(`[${transactionId}] Calling NCWallet API`);

        const ncWalletResponse = await fetch("https://ncwallet.africa/api/v1/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                trnx_pin: process.env.NCWALLET_TRNX_PIN!,
                Authorization: process.env.NCWALLET_API_KEY!,
            },
            body: JSON.stringify(ncWalletPayload),
        });

        console.log(`[${transactionId}] NCWallet response status: ${ncWalletResponse.status}`);

        const responseText = await ncWalletResponse.text();
        console.log(`[${transactionId}] NCWallet response body:`, responseText);

        await pendingTransactionRef.update({
            ncWalletResponse: responseText,
        });

        let dataResult: NCWalletResponse | null = null;
        let parseSuccessful = false;

        try {
            dataResult = JSON.parse(responseText);
            parseSuccessful = true;
            console.log(`[${transactionId}] Response parsed successfully, status: ${dataResult?.status}`);
        } catch {
            parseSuccessful = false;
            console.log(`[${transactionId}] Failed to parse response, will verify later`);
        }

        if (parseSuccessful && dataResult && dataResult.status === "success") {
            console.log(`[${transactionId}] Transaction successful, processing wallet debit`);
            await processWalletDebit(
                userId,
                transactionId,
                amount,
                phoneNumber,
                networkId,
                planId,
                dataResult.data?.reference || transactionId,
                dataResult.message
            );

            return NextResponse.json({
                status: "success",
                message: `Data plan successfully sent to ${phoneNumber}.`,
                transactionId,
            });
        }

        if (parseSuccessful && dataResult && dataResult.status !== "success") {
            console.log(`[${transactionId}] Transaction failed with message: ${dataResult.message}`);
            await pendingTransactionRef.update({ status: 'failed' });
            throw new Error(dataResult.message || "The data provider failed to process the request.");
        }

        if (!parseSuccessful || (ncWalletResponse.ok && !dataResult)) {
            console.log(`[${transactionId}] Setting status to verifying for background processing`);
            await pendingTransactionRef.update({
                status: 'verifying',
                verificationAttempts: FieldValue.increment(1)
            });

            throw new Error("Transaction could not be completed. If you received the data, please contact support.");
        }

        console.log(`[${transactionId}] Unknown error condition, marking as failed`);
        await pendingTransactionRef.update({ status: 'failed' });
        throw new Error("Transaction processing failed");

    } catch (error) {
        console.log(`[${transactionId}] Transaction error: ${error instanceof Error ? error.message : 'Unknown error'}`);

        if (transactionId && userId) {
            try {
                const pendingRef = adminDb.doc(`pendingTransactions/${transactionId}`);
                const currentDoc = await pendingRef.get();
                const currentStatus = currentDoc.data()?.status;

                if (currentStatus !== 'verifying') {
                    await pendingRef.update({
                        status: 'failed',
                        error: error instanceof Error ? error.message : 'Unknown error'
                    });
                    console.log(`[${transactionId}] Status updated to failed`);
                } else {
                    console.log(`[${transactionId}] Keeping verifying status for background processing`);
                }
            } catch {
                console.log(`[${transactionId}] Failed to update transaction status`);
            }
        }

        const message = error instanceof Error ? error.message : "An internal server error occurred";
        return NextResponse.json({ message }, { status: 500 });
    }
}