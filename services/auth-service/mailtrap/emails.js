import e from "express";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
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
};

export const sendResetPasswordEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password reset"
        });
    } catch (error) {
        console.error("Error in sending Password Reset Email: ",error);
        throw new Error(`Error in sending Password Reset Email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password reset"
        });
    } catch (error) {
        console.error("Error in sending Password Reset Sucess Email: ",error);
        throw new Error(`Error in sending Password Reset Sucess Email: ${error}`);
    }
};