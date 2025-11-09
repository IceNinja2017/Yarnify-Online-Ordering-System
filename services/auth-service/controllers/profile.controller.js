import { User } from '../models/user.model.js';
import axios from "axios";
import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../../config/loadEnv.js";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import multer from 'multer';
import { storage } from "../middleware/storage.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFileURL = pathToFileURL(path.join(__dirname, "../.env")).href;
const upload = multer({ storage });

loadEnv(envFileURL, dotenvFlow);