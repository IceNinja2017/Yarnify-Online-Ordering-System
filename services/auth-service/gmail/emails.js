import e from "express";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { transporter, sender } from "./gmail.config.js";

export const sendVerificationEmain = async (email, verificationToken) => {
    try {
        const info = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Verify your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        });

        console.log("Verification Email sent:", info.messageId);
    } catch (error) {
        console.error("Error in sending Verification Email:", error);
        throw new Error(`Error in sending Verification Email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, username) => {
    try {
        const info = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Welcome to Yarnify!",
            html: WELCOME_EMAIL_TEMPLATE.replace("{username}", username)
        });

        console.log("Welcome Email sent:", info.messageId);
    } catch (error) {
        console.error("Error in sending Welcome Email:", error);
        throw new Error(`Error in sending Welcome Email: ${error}`);
    }
};

export const sendResetPasswordEmail = async (email, resetURL) => {
    try {
        const info = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Reset your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
        });

        console.log("Password Reset Email sent:", info.messageId);
    } catch (error) {
        console.error("Error in sending Password Reset Email:", error);
        throw new Error(`Error in sending Password Reset Email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    try {
        const info = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE
        });

        console.log("Password Reset Success Email sent:", info.messageId);
    } catch (error) {
        console.error("Error in sending Password Reset Success Email:", error);
        throw new Error(`Error in sending Password Reset Success Email: ${error}`);
    }
};