import express from "express";
import { getUserById, login, logout, register, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.contoller.js"
import { validateToken } from "../middleware/authorize.js";

const router = express.Router();

router.get("/check-auth",validateToken, checkAuth)

router.get("/:userId", getUserById);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;