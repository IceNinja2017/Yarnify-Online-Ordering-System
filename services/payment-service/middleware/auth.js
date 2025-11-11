import jwt from "jsonwebtoken";

import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../../config/loadEnv.js";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFileURL = pathToFileURL(path.join(__dirname, "../.env")).href;

loadEnv(envFileURL, dotenvFlow);


export const validateToken = (req, res, next) => {
    // 1. Try header first (optional)
    let token = req.headers["authorization"]?.split(" ")[1];

    // 2. If no header, try cookie
    if (!token && req.cookies?.token) {
        token = req.cookies.token;
    }

    console.log("Validating token:", token);

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Token validation error:", error);
        return res.status(401).json({ success: false, message: "Unauthorized - Token validation failed" });
    }
};
