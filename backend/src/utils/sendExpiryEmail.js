import nodemailer from "nodemailer";

export default async function sendExpiryEmail(user) {
  // 🔍 HARD DEBUG (leave for now)
  console.log("EMAIL_HOST =", process.env.EMAIL_HOST);
  console.log("EMAIL_PORT =", process.env.EMAIL_PORT);
  console.log("EMAIL_USER =", process.env.EMAIL_USER);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log("📧 Sending expiry email to:", user.email);

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "⏰ Resume Builder Pro Expiring Today",
    html: `
      <h2>Hello ${user.fullName},</h2>
      <p>Your <b>Resume Builder Pro</b> access expires <b>today</b>.</p>
      <p>Please renew to continue using premium templates and AI features.</p>
      <br/>
      <p>— Resume Builder Team</p>
    `,
  });
}
