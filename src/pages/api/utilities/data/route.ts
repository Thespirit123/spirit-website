import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const authorization = req.headers.get("Authorization");
    if (!authorization?.startsWith("Bearer ")) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const idToken = authorization.split("Bearer ")[1];
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const userId = decodedToken.uid;

        const { networkId, planId, phoneNumber, amount } = await req.json();

        if (!networkId || !planId || !phoneNumber || !amount) {
            return NextResponse.json(
                { message: "Invalid request parameters" },
                { status: 400 }
            );
        }

        const walletRef = adminDb.doc(`users/${userId}/wallets/utilities`);
        const walletDoc = await walletRef.get();

        if (!walletDoc.exists || (walletDoc.data()?.balance || 0) < amount) {
            return NextResponse.json(
                { message: "Insufficient wallet balance" },
                { status: 400 }
            );
        }

        const ncWalletResponse = await fetch("https://ncwallet.africa/api/v1/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                trnx_pin: process.env.NCWALLET_TRNX_PIN!,
                Authorization: process.env.NCWALLET_API_KEY!,
            },
            body: JSON.stringify({
                network: networkId,
                data_plan: planId,
                phone_number: phoneNumber,
                country_code: "NG",
                bypass: true,
            }),
        });

        const dataResult = await ncWalletResponse.json();

        if (dataResult.status !== "success") {
            const providerMessage = dataResult.message as string | undefined;
            if (providerMessage?.toLowerCase().includes("insufficient balance")) {
                throw new Error(
                    "Transaction failed due to a provider issue. Please try again later."
                );
            }
            throw new Error(
                providerMessage || "The data provider failed to process the request."
            );
        }

        const transactionId = `data_${Date.now()}`;
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
            reference: dataResult.data?.reference || transactionId,
            status: "success",
            timestamp: FieldValue.serverTimestamp(),
            transactionId,
            type: "debit",
            metadata: {
                service: "data",
                recipient: phoneNumber,
                networkId,
                planId,
                providerResponse: dataResult.data,
            },
        });

        await batch.commit();

        return NextResponse.json({
            status: "success",
            message: `Data plan successfully sent to ${phoneNumber}.`,
            transactionId,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "An internal server error occurred";
        return NextResponse.json({ message }, { status: 500 });
    }
}