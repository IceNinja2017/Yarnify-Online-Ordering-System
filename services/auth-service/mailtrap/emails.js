import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmain = async (email, verificationToken) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });

        console.log("Email Sent Sucessfully", response);
    } catch (error) {
        console.error("Error in sending Verification Email: ",error);
        throw new Error(`Error in sending Verification Email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, username) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "d3a663bb-921f-4912-95a2-eb96e7ac206a",
            template_variables: {
                "company_info_name": "Yarnify",
                "username": username
            },
        })

        console.log("Welcome Email Sent Sucessfully", response);
    } catch (error) {
        console.error("Error in sending Welcome Email: ",error);
        throw new Error(`Error in sending Welcome Email: ${error}`);
    }
}