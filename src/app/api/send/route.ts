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

import { sendDownloadEmail } from "@/lib/email/download";
import { NextResponse } from "next/server";

interface EmailRequestBody {
  customerEmail: string;
  appName: string;
  downloadUrl?: string;
  instructions?: string[];
}

export async function POST(request: Request) {
  try {
    const body: EmailRequestBody = await request.json();
    await sendDownloadEmail(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("📧 API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
