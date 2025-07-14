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

import { sendFeedbackEmail } from "@/lib/email/feedback";
import { FeedbackFormData } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const feedback: FeedbackFormData = await request.json();
    await sendFeedbackEmail(feedback);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("📧 API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to send feedback" },
      { status: 500 }
    );
  }
}
