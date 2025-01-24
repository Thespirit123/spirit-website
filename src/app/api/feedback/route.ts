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
