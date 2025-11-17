import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../../config/loadEnv.js";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFileURL = pathToFileURL(path.join(__dirname, "../.env")).href;

loadEnv(envFileURL, dotenvFlow);

export const me = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            loggedIn: false,
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // make sure JWT_SECRET matches what you used to sign
        const userId = decoded.userId; // assuming your token payload has { id: user._id }
        console.log(decoded)
        // Optionally, fetch full user info if needed
        const user = await User.findById(userId).select("_id username email address role profileImage"); // select fields you want to return

        return res.status(200).json({
            loggedIn: true,
            user: user, // or { _id: user._id } if you just want ID
        });
        
    } catch (err) {
        console.error(err);
        return res.status(401).json({
            loggedIn: false,
        });
    }
};


export const checkAuth = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);
        if(!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            message: "User is authenticated",
            user: {
                ...user._doc,
                password: undefined,
                passwordResetToken: undefined,
                passwordResetExpiresAt: undefined,
                verificationToken: undefined,
                verificationTokenExpiresAt: undefined,
            }
        });
    } catch (error) {
        console.error("Error in checking authentication:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}