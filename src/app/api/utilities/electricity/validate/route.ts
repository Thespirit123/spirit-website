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

import { NextRequest, NextResponse } from "next/server";

interface NcWalletValidationSuccessData {
    meter_id: string;
    meter_company: string;
    meter_number: string;
    customer_name: string;
    meter_address: string;
}

interface NcWalletValidationResponse {
    status: "success" | string;
    message: string;
    data?: NcWalletValidationSuccessData;
}

export async function POST(req: NextRequest) {
    const { meterId, meterType, meterNumber } = await req.json();

    if (!meterId || !meterType || !meterNumber) {
        return NextResponse.json(
            { message: "Missing required validation parameters" },
            { status: 400 }
        );
    }

    try {
        const validationUrl = `https://ncwallet.africa/api/v1/electricity/validation?meter_id=${meterId}&meter_type=${meterType}&meter_number=${meterNumber}`;

        const response = await fetch(validationUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                trnx_pin: process.env.NCWALLET_TRNX_PIN!,
                Authorization: process.env.NCWALLET_API_KEY!,
            },
        });

        const result: NcWalletValidationResponse = await response.json();

        if (!response.ok || result.status !== "success" || !result.data) {
            throw new Error(result.message || "Provider could not validate meter.");
        }

        return NextResponse.json({
            name: result.data.customer_name,
            address: result.data.meter_address,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "An internal server error occurred";
        return NextResponse.json({ message }, { status: 500 });
    }
}