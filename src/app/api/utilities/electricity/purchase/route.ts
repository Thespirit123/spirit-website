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

        const { discoApiId, meterNumber, meterType, amount } = await req.json();

        if (!discoApiId || !meterNumber || !meterType || !amount || amount < 1000) {
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

        const ncWalletResponse = await fetch(
            "https://ncwallet.africa/api/v1/electricity",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    trnx_pin: process.env.NCWALLET_TRNX_PIN!,
                    Authorization: process.env.NCWALLET_API_KEY!,
                },
                body: JSON.stringify({
                    meter_id: discoApiId,
                    meter_number: meterNumber,
                    meter_type: meterType,
                    amount: amount.toString(),
                    bypass: true,
                }),
            }
        );

        const purchaseResult = await ncWalletResponse.json();

        if (purchaseResult.status !== "success") {
            const providerMessage = purchaseResult.message as string | undefined;
            if (providerMessage?.toLowerCase().includes("insufficient balance")) {
                throw new Error(
                    "Transaction failed due to a provider issue. Please try again later."
                );
            }
            throw new Error(
                providerMessage || "The electricity provider failed the request."
            );
        }

        const transactionId = purchaseResult.ref_id || `elec_${Date.now()}`;
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
            description: `Electricity purchase for ${meterNumber}`,
            paymentMethod: "wallet",
            reference: transactionId,
            status: "success",
            timestamp: FieldValue.serverTimestamp(),
            transactionId,
            type: "debit",
            metadata: {
                service: "electricity",
                recipient: meterNumber,
                discoApiId,
                meterType,
                token: purchaseResult.data?.token,
                providerResponse: purchaseResult.data,
            },
        });

        await batch.commit();

        return NextResponse.json({
            status: "success",
            message: purchaseResult.message,
            transactionId,
            token: purchaseResult.data?.token,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "An internal server error occurred";
        return NextResponse.json({ message: `Transaction failed: ${message}` }, { status: 500 });
    }
}