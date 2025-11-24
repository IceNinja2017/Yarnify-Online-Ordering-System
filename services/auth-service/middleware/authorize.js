import jwt from "jsonwebtoken";

import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

export const validateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Token validation error:", error);
        return res.status(401).json({ success: false, message: "Unauthorized - Token validation failed" });
    }
};