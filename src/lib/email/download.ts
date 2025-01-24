import { AppDownloadEmail } from "@/types";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const VERIFIED_DOMAIN = "thespiritmedia.com.ng";

export async function sendDownloadEmail({
  customerEmail,
  appName,
  downloadUrl,
  instructions,
}: AppDownloadEmail) {
  const emailContent = `
    <h1>Thank you for your purchase!</h1>
    ${
      downloadUrl
        ? `<p>Click the link below to download your app:</p>
         <a href="${downloadUrl}">Download ${appName}</a>`
        : `<h2>Installation Instructions:</h2>
         <ul>${instructions
           ?.map((instruction) => `<li>${instruction}</li>`)
           .join("")}</ul>`
    }
  `;

  try {
    const response = await resend.emails.send({
      from: `Spirit Media <downloads@${VERIFIED_DOMAIN}>`,
      to: customerEmail,
      subject: `Download Your ${appName} App`,
      html: emailContent,
    });
    return response;
  } catch (error) {
    console.error("❌ Email send failed:", {
      error,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      errorStack: error instanceof Error ? error.stack : undefined,
    });

    if (error instanceof Error) {
      throw new Error(`Failed to send download instructions: ${error.message}`);
    }
    throw new Error("Failed to send download instructions");
  }
}
