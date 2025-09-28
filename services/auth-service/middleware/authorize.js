import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Check if user is authenticated
export const authenticate = async(req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password"); // exclude password
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user; // attach user to request
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};