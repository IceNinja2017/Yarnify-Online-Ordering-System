import nodemailer from "nodemailer";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

const GmailUser = process.env.GMAIL_USER
const GmailPass = process.env.GMAIL_PASS

export const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: process.env.NODE_ENV === "production",
    auth: {
        user: GmailUser,
        pass: GmailPass
    }
});

export const sender = `"Yarnify" <${GmailUser}>`;
