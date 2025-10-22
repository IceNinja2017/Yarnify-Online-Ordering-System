import cors from "cors";
import express from "express";
import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../config/loadEnv.js";
import { connectDB } from "../config/db.js";
import mongoose from "mongoose";
import paymentRoutes from "./routes/payment.route.js";

dotenv.config();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/payment", paymentRoutes);

loadEnv(import.meta.url, dotenvFlow);

const app = express();
const PORT = process.env.PORT;
const SERVICE_NAME = process.env.SERVICE_NAME;

app.listen(PORT, () =>{
    connectDB(mongoose);
    console.log(SERVICE_NAME + " Server started at http://localhost:" + PORT);
});