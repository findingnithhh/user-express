// utils/emailUtils.ts
require("dotenv").config();
import nodemailer from "nodemailer";

export async function sendVerificationEmail(
  email: string,
  verificationLink: string
) {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Verify your email address",
    html: `Please click <a href="${verificationLink}">here</a> to verify your email address.`,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}
