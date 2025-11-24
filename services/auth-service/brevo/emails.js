// emails.js
import { sendHtmlEmail } from "./brevo.js";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken, name = "User") => {
    return sendHtmlEmail({
        toEmail: email,
        toName: name,
        subject: "Verify your Email",
        htmlContent: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
    });
};

export const sendWelcomeEmail = async (email, username) => {
    return sendHtmlEmail({
        toEmail: email,
        toName: username,
        subject: "Welcome to Yarnify!",
        htmlContent: WELCOME_EMAIL_TEMPLATE.replace("{username}", username)
    });
};

export const sendResetPasswordEmail = async (email, resetURL, name = "User") => {
    return sendHtmlEmail({
        toEmail: email,
        toName: name,
        subject: "Reset your Password",
        htmlContent: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
    });
};

export const sendResetSuccessEmail = async (email, name = "User") => {
    return sendHtmlEmail({
        toEmail: email,
        toName: name,
        subject: "Password Reset Successful",
        htmlContent: PASSWORD_RESET_SUCCESS_TEMPLATE
    });
};