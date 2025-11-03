import nodemailer from "nodemailer";

import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../../config/loadEnv.js";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFileURL = pathToFileURL(path.join(__dirname, "../.env")).href;

loadEnv(envFileURL, dotenvFlow);

const GmailUser = process.env.GMAIL_USER
const GmailPass = process.env.GMAIL_PASS

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GmailUser,
        pass: GmailPass
    }
});

export const sender = `"Yarnify" <${GmailUser}>`;
