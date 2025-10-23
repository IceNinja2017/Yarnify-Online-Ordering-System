import express from "express";
import { getUserById, login, logout, register, verifyEmail } from "../controllers/auth.contoller.js"
import { me, validateToken } from "../controllers/verification.controller.js";
import { authenticate } from "../middleware/authorize.js";

const router = express.Router();

router.get("/:userId", getUserById);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.get("/me", authenticate, me);

router.get("/validate-token", authenticate, validateToken);

export default router;