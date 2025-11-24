// brevo.js
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenvFlow from "dotenv-flow";
dotenvFlow.config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendHtmlEmail = async ({ toEmail, toName, subject, htmlContent }) => {
    const sendSmtpEmail = {
        to: [{ email: toEmail, name: toName }],
        sender: { email: "johnkenneth.dignos17@gmail.com", name: process.env.BREVO_SENDER_NAME },
        subject,
        htmlContent
    };

    try {
        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log(`Email sent to ${toEmail}:`, response);
        return response;
    } catch (error) {
        console.error(`[Email] Error sending email to ${toEmail}:`, error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};