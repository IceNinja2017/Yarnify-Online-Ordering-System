import { User } from "../models/user.model.js";

export const me = async (req, res) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ 
            loggedIn: false 
        });
    }

    res.status(200).json({
        loggedIn: true,
    });
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