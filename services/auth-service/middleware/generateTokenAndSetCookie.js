import jwt from "jsonwebtoken"
import dotenvFlow from "dotenv-flow";
dotenvFlow.config();

export const generateTokenAndSetCookie = (res, userId) => {
    //token creation
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    //cookie setter
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return token;
};