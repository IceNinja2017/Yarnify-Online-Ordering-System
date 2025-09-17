import path from "path";
import { fileURLToPath } from "url";

export function loadEnv(moduleUrl, dotenvLib) {
  const __filename = fileURLToPath(moduleUrl);
  const __dirname = path.dirname(__filename);

  // Load global .env
  dotenvLib.config({ path: path.resolve(__dirname, "../") });

  // Load service-specific .env
  dotenvLib.config({ path: path.resolve(__dirname, ".") });
}
