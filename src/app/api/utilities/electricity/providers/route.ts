import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch(
            "https://ncwallet.africa/api/v1/service/id/power",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    trnx_pin: process.env.NCWALLET_TRNX_PIN!,
                    Authorization: process.env.NCWALLET_API_KEY!,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch electricity providers.");
        }

        const data = await response.json();

        if (data.status !== "success") {
            throw new Error(data.message || "Provider returned an error.");
        }

        return NextResponse.json(data.data_list);
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "An internal server error occurred";
        return NextResponse.json({ message }, { status: 500 });
    }
}