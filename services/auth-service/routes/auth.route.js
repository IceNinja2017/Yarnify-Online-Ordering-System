import express from "express";
import { getUserById, login, logout, register, verifyEmail, forgotPassword, resetPassword, updateProfile } from "../controllers/auth.contoller.js"
import { validateToken } from "../middleware/authorize.js";
import { me, checkAuth } from "../controllers/verify.controller.js";

const router = express.Router();

router.get("/me", validateToken, me)
router.get("/check-auth",validateToken, checkAuth)

router.get("/:userId", getUserById);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.patch("/update-profile", updateProfile)

export default router;