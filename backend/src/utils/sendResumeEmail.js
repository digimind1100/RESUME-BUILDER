import nodemailer from "nodemailer";
import { generateResumePDF } from "./generateResumePDF.js";


export const sendResumeEmail = async ({ resumeId, resumeUrl, toEmail }) => {
  const pdfPath = await generateResumePDF(resumeUrl, resumeId);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Resume Builder" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "My Resume (PDF)",
    text: "Please find my resume attached.",
    attachments: [
      {
        filename: `${resumeId}.pdf`,
        path: pdfPath,
      },
    ],
  });
};

