import { v2 as cloudinary } from 'cloudinary';

import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../../config/loadEnv.js";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFileURL = pathToFileURL(path.join(__dirname, "../.env")).href;

loadEnv(envFileURL, dotenvFlow);

export const ConnectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        console.log("Cloudinary configured successfully");
    } catch (error) {
        console.error("Error configuring Cloudinary:", error);
    }
}

export { cloudinary };