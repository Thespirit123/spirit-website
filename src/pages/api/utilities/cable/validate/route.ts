import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const companyApiId = searchParams.get("companyApiId");
    const cableNumber = searchParams.get("cableNumber");

    if (!companyApiId || !cableNumber) {
        return NextResponse.json(
            { message: "Company ID and cable number are required." },
            { status: 400 }
        );
    }

    try {
        const validationUrl = `https://ncwallet.africa/api/v1/cable/validation?cable_id=${companyApiId}&cable_number=${cableNumber}`;

        const response = await fetch(validationUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                trnx_pin: process.env.NCWALLET_TRNX_PIN!,
                Authorization: process.env.NCWALLET_API_KEY!,
            },
        });

        const data = await response.json();

        if (!response.ok || data.status !== "success") {
            throw new Error(data.message || "Validation failed.");
        }

        return NextResponse.json(data.data);
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "An internal server error occurred";
        return NextResponse.json({ message }, { status: 500 });
    }
}