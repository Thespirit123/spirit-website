
import { pdfFiles } from '../../../lib/pdfFiles';
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, phone, pdfHeader } = req.body;

//   console.log(req.body)
//    return res.status(200).json({ message: "Received!" });


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
  const downloadLink = `https://letsee-xyrx.vercel.app/api/sendDownload/downloads?file=${encodeURIComponent(pdf.filename)}`;

//   Set up email transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // or another provider like "mailgun", "outlook"
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
     auth: {
      user: "chukwubuikekingsley369@gmail.com",
      pass: "bwdlnosrmssurjwu",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your PDF Download Link",
    html: `<p style="text-align:center; font-weight:600; font-size:20px;color:#000 ">Hi ${name},</p>
           <p style="Text-align:center; font-size:28px; font-weight:600; color:blue;">Thank You For Your Download</p>
           <p style="text-align:center; font-size: 16px; color:#000">Click the link below to download your selected PDF:</p>
           <div style="display:flex; align-item:center; justify-content: center"><a href="${downloadLink}" style="text-align: center; font-size:18px; color:blue">Download ${pdf.filename}</a></div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Download link sent to your email." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Email could not be sent." });
  }
}