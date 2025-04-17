import { FeedbackFormData } from "@/types";
import { Resend } from "resend";

export async function sendFeedbackEmail(feedback: FeedbackFormData) {
  const VERIFIED_DOMAIN = "thespiritmedia.com.ng";
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
  const COMPANY_NAME = "Spirit Media";
  const SUPPORT_EMAIL = "theespiritmedia@gmail.com";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Feedback from ${COMPANY_NAME}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">New Customer Feedback</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
            <p><strong>Customer Name:</strong> ${feedback.fullName}</p>
            <p><strong>Email:</strong> ${feedback.email}</p>
            <p><strong>Service Used:</strong> ${feedback.service}</p>
            <p><strong>Rating:</strong> ${feedback.rating} ⭐️</p>
            <p><strong>Experience:</strong><br>${feedback.experience}</p>
            <p><strong>Suggestions:</strong><br>${
              feedback.improvement || "None provided"
            }</p>
            <p><strong>Would Recommend:</strong> ${feedback.recommend}</p>
          </div>
          <div style="margin-top: 20px; font-size: 12px; color: #666;">
            <p>This is an automated message from ${COMPANY_NAME}</p>
            <p>For support: <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
    New Customer Feedback

    Customer Name: ${feedback.fullName}
    Email: ${feedback.email}
    Service Used: ${feedback.service}
    Rating: ${feedback.rating}
    Experience: ${feedback.experience}
    Suggestions: ${feedback.improvement || "None provided"}
    Would Recommend: ${feedback.recommend}

    This is an automated message from ${COMPANY_NAME}
    For support: ${SUPPORT_EMAIL}
  `;

  return resend.emails.send({
    from: `${COMPANY_NAME} <feedback@${VERIFIED_DOMAIN}>`,
    to: "theespiritmedia@gmail.com",
    replyTo: feedback.email,
    subject: `New Customer Feedback - ${feedback.service}`,
    html: htmlContent,
    text: textContent,
    headers: {
      "X-Entity-Ref-ID": Date.now().toString(),
      "List-Unsubscribe": `<mailto:${SUPPORT_EMAIL}?subject=unsubscribe>`,
    },
  });
}
