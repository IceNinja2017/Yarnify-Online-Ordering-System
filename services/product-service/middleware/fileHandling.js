import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------- Storage Configuration -----------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads/");
        // Ensure the upload directory exists
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        // Use path.basename to prevent directory traversal attacks
        cb(null, uniqueSuffix + '-' + path.basename(file.originalname));
    }
});

// ----------- File Filter -----------
const fileFilter = (req, file, cb) => {
    // Allow only images (you can add other types if needed)
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

// ----------- Multer Upload Instance -----------
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

// ----------- Middleware for Single File Upload -----------
export const uploadSingleFile = (fieldName) => upload.single(fieldName);

// ----------- Middleware for Multiple File Uploads -----------
export const uploadMultipleFiles = (fieldName, maxCount) => upload.array(fieldName, maxCount);

// ----------- Async File Deletion Helper -----------
export const deleteUploadedFile = async (filePath) => {
    try {
        await fs.promises.unlink(filePath);
        console.log("File deleted successfully:", filePath);
    } catch (err) {
        console.error("Error deleting file:", err);
    }
};

// ----------- Example Error Handling Middleware -----------
// Usage in Express route:
//
// app.post("/upload", uploadSingleFile("image"), (req, res) => {
//     res.json({ file: req.file });
// }, (err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//         return res.status(400).json({ message: err.message });
//     } else if (err) {
//         return res.status(400).json({ message: err.message });
//     }
//     next();
// });
