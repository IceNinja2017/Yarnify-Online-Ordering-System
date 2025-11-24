import dotenvFlow from "dotenv-flow";
import multer from 'multer';
import { storage } from "../middleware/storage.config.js";

dotenvFlow.config();

const upload = multer({ storage });

loadEnv(envFileURL, dotenvFlow);