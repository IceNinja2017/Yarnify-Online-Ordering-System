import express from "express";
import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../config/loadEnv.js";
import { connectDB } from "../config/db.js";
import mongoose from "mongoose";
import paymentRoutes from "./routes/payment.route.js";

loadEnv(import.meta.url, dotenvFlow);

const app = express();
const PORT = process.env.PORT || 8082;
const SERVICE_NAME = process.env.SERVICE_NAME || "Payment-Service";

app.use(express.json()); // Enable reading JSON

app.listen(PORT, () => {
    connectDB(mongoose); // Connect to DB
    console.log(`${SERVICE_NAME} Server running at http://localhost:${PORT}`);
});

// Use payment routes for paths starting with /api/payment
app.use("/api/payment", paymentRoutes);