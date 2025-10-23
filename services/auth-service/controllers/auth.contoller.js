import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../middleware/generateTokenAndSetCookie.js";
import { sendVerificationEmain, sendWelcomeEmail } from "../mailtrap/emails.js";


export const register = async (req, res) => {
    try {
        const { username, email, password, address} = req.body;

        // required field checks
        if (!username || !email || !password) {
            return res.status(400).json({ message: "username, email and password are required" });
        }

        // Address is an object with required street, city, country
        if (!address || typeof address !== "object") {
            return res.status(400).json({ message: "address is required and must be an object" });
        }
        const { street, city, country } = address;
        if (!street || !city || !country) {
            return res.status(400).json({ message: "address.street, address.city, and address.country are required" });
        }

        // Check duplicates (email or username)
        const existing = await User.findOne({
            $or: [{ email: email.toLowerCase() }, { username }]
        });
        if (existing) {
            if (existing.email === email.toLowerCase()) {
                return res.status(409).json({ message: "Email already in use" });
            }
            return res.status(409).json({ message: "Username already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create verification token (for email verification flow)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); //crypto.randomBytes(32).toString("hex");
        const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            address: {
                street: address.street,
                city: address.city,
                state: address.state || null,
                postalCode: address.postalCode || null,
                country: address.country
            },
            verificationToken,
            verificationTokenExpiresAt
        });

        await newUser.save();

        //jwt token
        generateTokenAndSetCookie(res, newUser._id);
        await sendVerificationEmain(newUser.email, newUser.verificationToken);

        // TODO: send verification email. Replace with your mailer.
        // sendVerificationEmail(newUser.email, verificationToken);

        // Sanitize response (remove sensitive fields)
        const userObj = newUser.toObject();
        delete userObj.password;
        delete userObj.verificationToken;
        delete userObj.verificationTokenExpiresAt;
        delete userObj.resetPasswordToken;
        delete userObj.resetPasswordExpiresAt;

        return res.status(201).json({
            sucess: true,
            message: "Registration successful. Check your email to verify your account.",
            user: userObj
        });
    } catch (err) {
        // handle duplicate key error that slipped through (extra safety)
        if (err?.code === 11000) {
            const dupKey = Object.keys(err.keyPattern || {}).join(", ");
            return res.status(409).json({ message: `Duplicate key: ${dupKey}` });
        }
        console.error("Register error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
                success: true,
                message: "Logged in Sucessfully",
                user: {
                    ...user._doc,
                    password: undefined,
                },
            });

    } catch (error) {
        console.log("Error in logging in", error);
        res.status(400).json({
                success: false,
                message: error.message
            });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
            success: true,
            message: "Logged out sucessfully"
        });
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne( {
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if(!user) {
            return res.status(400).json({ success: false, message: "Invalid or Expired Verification Code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.username);
        res.status(200).json({
            success: true,
            message: "Email verified sucessfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.error("Error in verifying Email:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId });

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User Found!",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
        });
    }
}