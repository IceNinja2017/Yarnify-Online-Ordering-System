import nodemailer from "nodemailer";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

const GmailUser = process.env.GMAIL_USER
const GmailPass = process.env.GMAIL_PASS

const BrevoUser = process.env.BREVO_SMTP_USER
const BrevoPass = process.env.BREVO_SMTP_PASS

export const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: BrevoUser,
        pass: BrevoPass
    }
});

export const sender = `"Yarnify" <${GmailUser}>`;
