import express from "express";
import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../config/loadEnv.js"; // Utility to load .env files
import { connectDB } from "../config/db.js"; // Utility to connect to MongoDB
import mongoose from "mongoose";
import paymentRoutes from "./routes/payment.route.js"; // Import the routes you defined

// Load .env variables (like PORT, MONGO_URI, JWT_SECRET, EMAIL_*)
loadEnv(import.meta.url, dotenvFlow);

const app = express(); // Create the Express application
const PORT = process.env.PORT || 8082; // Use port from .env or default to 8082
const SERVICE_NAME = process.env.SERVICE_NAME || "Payment-Service";

// Middleware to allow Express to understand JSON request bodies - VERY IMPORTANT
app.use(express.json());

// Start listening for requests on the specified port
app.listen(PORT, () => {
    connectDB(mongoose); // Connect to the database when the server starts
    console.log(`${SERVICE_NAME} Server running at http://localhost:${PORT}`);
});

// Tell Express to use your paymentRoutes for any URL starting with /api/payment
app.use("/api/payment", paymentRoutes);