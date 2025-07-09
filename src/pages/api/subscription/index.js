
import nodemailer from "nodemailer";
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
   

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

     const transporter = nodemailer.createTransport({
        service: "gmail",
          auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
        
      });
      const mailOptions = {
    from: "The Spirit Media",
    to: email,
    subject: "Email Subscription",
    html: `
  <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #000000; color: #ffffff; border: 1px solid #333;">
    
    <p style="text-align:center; font-size:34px; font-weight:600; color:#1a73e8;">
      Thanks For Your Subscription
    </p>
    <p style="text-align:center;  font-size:20px;color:#fff">
   You're now part of our community. Keep an eye on your inbox — exciting updates, exclusive offers, and the latest news are coming your way.
    
    </p>
    <hr style="margin:40px 0; border:none; border-top:1px solid #333;" />

    <p style="text-align:center; font-size:12px; color:#888;">
      &copy; ${new Date().getFullYear()} TheSpiritMedia. All rights reserved.
    </p>
  </div>
`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Subscribed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Email sbscription failed." });
  }

    
   
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
