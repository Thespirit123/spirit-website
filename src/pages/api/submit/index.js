
import { pdfFiles } from '../../../lib/pdfFiles';
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, phone, pdfHeader } = req.body;

  if (!name || !email || !phone || !pdfHeader) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email." });
  }

  if (!/^\+?\d{7,15}$/.test(phone)) {
    return res.status(400).json({ message: "Invalid phone number." });
  }

  const pdf = pdfFiles.find(p => p.header === pdfHeader);
  if (!pdf) return res.status(404).json({ message: "PDF not found." });

//   const downloadLink = `${process.env.BASE_URL}/api/sendLink/downloads?file=${encodeURIComponent(pdf.filename)}`;
  const downloadLink = `https://spirit-website.vercel.app/api/sendDownload/downloads?file=${encodeURIComponent(pdf.filename)}`;


  const transporter = nodemailer.createTransport({
    service: "gmail", 
    // auth: {
    //   user: process.env.EMAIL_USER,
    //   pass: process.env.EMAIL_PASS,
    // },
     auth: {
      user: "Theespiritmedia@gmail.com",
      pass: "tnjihsxaajvtntet",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your PDF Download Link",
    html: `<div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #000000; color: #ffffff; border: 1px solid #333;">
    
    <p style="text-align:center; font-weight:600; font-size:20px;">
      Hi ${name},
    </p>

    <p style="text-align:center; font-size:34px; font-weight:600; color:#1a73e8;">
      Thanks For Your Download
    </p>

    <p style="text-align:center; font-size:20px; color:#fff">
      Click the button below to download your selected PDF:
    </p>

    <div style="text-align:center; margin: 30px 0;">
      <a href="${downloadLink}" 
         style="background-color:#1a73e8; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; font-size:16px; font-weight:500;">
        Download ${pdf.filename}
      </a>
    </div>

    <p style="text-align:center; font-size:18px; color:#bbb;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>

    <p style="text-align:center; word-break:break-all; font-size:16px;">
      <a href="${downloadLink}" style="color:#1a73e8;">${downloadLink}</a>
    </p>

    <hr style="margin:40px 0; border:none; border-top:1px solid #333;" />

    <p style="text-align:center; font-size:12px; color:#888;">
      &copy; ${new Date().getFullYear()} TheSpiritMedia. All rights reserved.
    </p>
  </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "The download link has been sent to your email. If it’s not in your inbox, please check your spam or junk folder." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Email could not be sent." });
  }
}