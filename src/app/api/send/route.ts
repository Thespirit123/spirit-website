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
