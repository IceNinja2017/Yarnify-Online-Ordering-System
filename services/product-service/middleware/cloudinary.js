import { ConnectCloudinary, cloudinary } from "./cloudinary.config.js";

ConnectCloudinary();

export const uploadToCloudinary = async (filePath, options = {}) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, options); // Upload the file to Cloudinary
        return result; // Return the upload result
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error; // Rethrow the error for further handling
    }
};

export const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId); // Delete the file from Cloudinary
        return result; // Return the deletion result
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        throw error; // Rethrow the error for further handling
    }
};