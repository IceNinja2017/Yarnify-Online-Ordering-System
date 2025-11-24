import jwt from "jsonwebtoken";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

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
