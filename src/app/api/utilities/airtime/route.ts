/**
 * 🚨 WARNING: DO NOT MOVE THIS FOLDER 🚨
 *
 * This `app/api` directory is **required** by Next.js to define API routes.
 * Moving or renaming it will **break the backend endpoints** and cause runtime errors.
 *
 * Reference: https://nextjs.org/docs/app/api-reference/file-conventions/route#http-methods
 *
 * If you're unsure about any changes to this directory, please ASK before modifying.
 */

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

        const { networkApiId, phoneNumber, amount } = await req.json();

        if (!networkApiId || !phoneNumber || !amount || amount < 50) {
            return NextResponse.json(
                { message: "Invalid request parameters" },
                { status: 400 }
            );
        }

        const discount = Math.floor(amount * 0.01);
        const chargedAmount = amount - discount;

        const walletRef = adminDb.doc(`users/${userId}/wallets/utilities`);
        const walletDoc = await walletRef.get();

        if (!walletDoc.exists || (walletDoc.data()?.balance || 0) < chargedAmount) {
            return NextResponse.json(
                { message: "Insufficient wallet balance" },
                { status: 400 }
            );
        }

        const ncWalletResponse = await fetch(
            "https://ncwallet.africa/api/v1/airtime",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    trnx_pin: process.env.NCWALLET_TRNX_PIN!,
                    Authorization: process.env.NCWALLET_API_KEY!,
                },
                body: JSON.stringify({
                    network: networkApiId,
                    country_code: "NG",
                    phone_number: phoneNumber,
                    airtime_type: "VTU",
                    amount: amount.toString(),
                    bypass: true,
                }),
            }
        );

        const airtimeResult = await ncWalletResponse.json();

        if (airtimeResult.status !== "success") {
            const providerMessage = airtimeResult.message as string | undefined;
            if (providerMessage?.toLowerCase().includes("insufficient balance")) {
                throw new Error("Transaction failed due to a provider issue. Please try again later.");
            }
            throw new Error(
                providerMessage || "The airtime provider failed to process the request."
            );
        }

        const transactionId = `airtime_${Date.now()}`;
        const transactionRef = adminDb.doc(
            `users/${userId}/wallets/utilities/transactions/${transactionId}`
        );

        const batch = adminDb.batch();

        batch.update(walletRef, {
            balance: FieldValue.increment(-chargedAmount),
            lastUpdated: FieldValue.serverTimestamp(),
        });

        batch.set(transactionRef, {
            amount,
            chargedAmount,
            discountApplied: "1%",
            description: `Airtime purchase for ${phoneNumber}`,
            paymentMethod: "wallet",
            reference: airtimeResult.data?.reference || transactionId,
            status: "success",
            timestamp: FieldValue.serverTimestamp(),
            transactionId,
            type: "debit",
            metadata: {
                service: "airtime",
                recipient: phoneNumber,
                networkApiId,
                discount,
                providerResponse: airtimeResult.data,
            },
        });

        await batch.commit();

        return NextResponse.json({
            status: "success",
            message: `Successfully sent ₦${amount.toLocaleString()} airtime to ${phoneNumber} (₦${discount.toLocaleString()} discount applied).`,
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