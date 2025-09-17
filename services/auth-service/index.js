import express from "express";
import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../config/loadEnv.js";
import { connectDB } from "../config/db.js";

loadEnv(import.meta.url, dotenvFlow);

const app = express();
const port = process.env.PORT;
const service_name = process.env.SERVICE_NAME;

app.listen(5000, () =>{
    connectDB();
    console.log(service_name + " Server started at http://localhost:" + port);
});