import cors from "cors";
import express from "express";
import dotenvFlow from "dotenv-flow";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import paymentRoutes from "./routes/payment.route.js";
import cookieParser from "cookie-parser";

dotenvFlow.config();

const app = express();
const PORT = process.env.PaymentService_PORT;
const SERVICE_NAME = process.env.SERVICE_NAME;

app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
}));

app.use(express.json());

// ROUTES
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () =>{
    connectDB(mongoose);
    console.log(SERVICE_NAME + " Server started at http://localhost:" + PORT);
});