import { ANDROID_DOWNLOAD_HELP } from "@/lib/constants";
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
  const isAndroidApk = downloadUrl?.endsWith(".apk");

  const emailContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Download Your ${appName}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; text-align: center; margin-bottom: 20px;">Thank you for your purchase!</h1>

          <div style="background: #f9fafb; padding: 25px; border-radius: 8px;">
            ${
              downloadUrl
                ? `
                <div style="text-align: center;">
                  <p style="font-size: 16px; margin-bottom: 20px;">Click below to download your app:</p>
                  <a href="${downloadUrl}" style="display: block; background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; margin-bottom: 20px;">
                    Download ${appName}
                  </a>
                  ${
                    isAndroidApk
                      ? `
                    <div style="margin-top: 24px; padding: 16px; background: #f3f4f6; border-radius: 8px; text-align: left;">
                      <p style="font-weight: 500; color: #374151; margin-bottom: 12px;">Download Troubleshooting</p>
                      <ul style="list-style-type: none; padding: 0; margin: 0;">
                        ${ANDROID_DOWNLOAD_HELP.map(
                          (tip) =>
                            `<li style="padding: 8px 0; color: #4b5563; font-size: 14px;">${tip}</li>`
                        ).join("")}
                      </ul>
                    </div>
                  `
                      : ""
                  }
                </div>
                `
                : instructions
                ? `
                <div>
                  <h2 style="font-size: 18px; margin-bottom: 15px;">Installation Instructions:</h2>
                  <ul style="list-style-type: none; padding: 0; margin: 0;">
                    ${instructions
                      .map(
                        (instruction) =>
                          `<li style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${instruction}</li>`
                      )
                      .join("")}
                  </ul>
                </div>
                `
                : ""
            }
          </div>

          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
            <p>This is an automated message from Spirit Media</p>
            <p>Need help? Contact us at theespiritmedia@gmail.com</p>
          </div>
        </div>
      </body>
    </html>
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
    if (error instanceof Error) {
      throw new Error(`Failed to send download instructions: ${error.message}`);
    }
    throw new Error("Failed to send download instructions");
  }
}
