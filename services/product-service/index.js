import express from "express";
import dotenvFlow from "dotenv-flow";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Import your routes
import productRoutes from "./routes/product.route.js";
dotenvFlow.config();

const app = express();
const PORT = process.env.ProductService_PORT;
const SERVICE_NAME = process.env.SERVICE_NAME;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("trust proxy", 1);

app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
}));

// ------------------- Middleware -------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------------- Routes -------------------
app.use('/api/products', productRoutes);

// ------------------- 404 Handler -------------------
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// ------------------- Start Server -------------------
app.listen(PORT, () => {
    connectDB(mongoose);
    console.log(`${SERVICE_NAME} Server started at http://localhost:${PORT}`);
});
