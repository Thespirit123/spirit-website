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

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
    initializeApp({
        credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)),
    });
}

const PLUZZPAY_TOKEN = process.env.PLUZZPAY_TOKEN;

export async function POST(req: Request) {
    const body = await req.json();
    const { email, name, phone, uid } = body;
    if (!email || !name || !phone || !uid) {
        return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    try {
        const db = getFirestore();
        const userRef = db.doc(`users/${uid}`);
        const userDoc = await userRef.get();

        if (userDoc.exists && userDoc.data()?.virtualWallet !== undefined) {
            return new Response(JSON.stringify({ status: true, message: "Wallet already exists", data: userDoc.data()!.virtualWallet }), { status: 200 });
        }

        const response = await fetch("https://pluzzpay.com/api/v1/paga-virtual-account.php", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${PLUZZPAY_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name, phone }),
        });

        const result = await response.json();
        console.log('PluzzPay response:', result);

        if (!result.status || !result.data) {
            return new Response(JSON.stringify({ message: "Failed to create virtual wallet", details: result }), { status: 500 });
        }

        await userRef.update({ virtualWallet: result.data });

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error instanceof Error ? error.message : error }), { status: 500 });
    }
}