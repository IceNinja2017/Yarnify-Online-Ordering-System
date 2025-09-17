import express from "express";
import dotenvFlow from "dotenv-flow";
import path from "path";
import { fileURLToPath } from "url";

  // Recreate __dirname in ESM
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Load global .env first (services/.env)
  dotenvFlow.config({
    path: path.resolve(__dirname, "../") // points to services/
  });

  // Load service-specific .env (auth-service, product-service, payment-service)
  dotenvFlow.config({
    path: path.resolve(__dirname, ".") // points to current service folder
  });

const app = express();
const port = process.env.PORT;
const service_name = process.env.SERVICE_NAME;

app.listen(5002, () =>{
    console.log(service_name + " Server started at http://localhost:" + port);
});