import { MailtrapClient } from "mailtrap";
import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../../config/loadEnv.js";

loadEnv(import.meta.url, dotenvFlow);

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
  endpoint: ENDPOINT
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Yarnify.com.ph",
};
