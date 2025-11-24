import express from "express";
import dotenvFlow from "dotenv-flow";
import cookieParser from "cookie-parser";
import { connectDB } from "../config/db.js";
import mongoose, { get } from "mongoose";
import authRoutes from "./routes/auth.route.js"
import cors from "cors";

dotenvFlow.config();

const app = express();
const PORT = process.env.AuthenticationService_PORT || 5000;
const SERVICE_NAME = process.env.SERVICE_NAME;

app.listen(PORT, () =>{
    connectDB(mongoose);
    console.log(SERVICE_NAME + " Server started at http://localhost:" + PORT);
});

app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
}));

app.use(express.json()); // parse incoming JSON request
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // parse cookies
app.use("/api/auth", authRoutes);
