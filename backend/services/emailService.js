import nodemailer from "nodemailer";

export async function sendEmail(recipients, summary) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Meeting Notes AI" <${process.env.EMAIL_USER}>`,
    to: recipients.join(","),
    subject: "Meeting Summary",
    text: summary
  });
}
