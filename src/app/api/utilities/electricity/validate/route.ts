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