import express from "express";
import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../config/loadEnv.js";
import { connectDB } from "../config/db.js";
import mongoose from "mongoose";
import productRoutes from "./routes/product.route.js";

loadEnv(import.meta.url, dotenvFlow);

const app = express();
const PORT = process.env.ProductService_PORT;
const SERVICE_NAME = process.env.SERVICE_NAME;

app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(PORT, () =>{
    connectDB(mongoose);
    console.log(SERVICE_NAME + " Server started at http://localhost:" + PORT);
});
