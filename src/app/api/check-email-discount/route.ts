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

import { adminDb } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        const purchasesRef = adminDb.collection('purchases');
        const existingPurchase = await purchasesRef
            .where('customerEmail', '==', email)
            .limit(1)
            .get();

        return NextResponse.json({
            isFirstTime: existingPurchase.empty
        });
    } catch (error) {
        return NextResponse.json({ isFirstTime: false }, { status: 500 });
    }
}