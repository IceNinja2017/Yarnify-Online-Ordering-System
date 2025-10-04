import express from "express";
import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../config/loadEnv.js";
import { connectDB } from "../config/db.js";
import mongoose, { get } from "mongoose";
import authRoutes from "./routes/auth.route.js"

loadEnv(import.meta.url, dotenvFlow);

const app = express();
const PORT = process.env.PORT;
const SERVICE_NAME = process.env.SERVICE_NAME;

app.listen(PORT, () =>{
    connectDB(mongoose);
    console.log(SERVICE_NAME + " Server started at http://localhost:" + PORT);
});

app.use(express.json()); // parse incoming JSON request
app.use("/api/auth", authRoutes);