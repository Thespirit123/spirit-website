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