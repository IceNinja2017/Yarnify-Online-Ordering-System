import Product from "../models/product.model.js";
import { deleteUploadedFile } from "../middleware/fileHandling.js";
import { uploadToCloudinary } from "../middleware/cloudinary.js";

export const dummyFunction = (req, res) => {
    res.status(200).json({ message: "Dummy function works!" });
}

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;
        let imageData = [];

        // Handle uploaded files (from multer.array)
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const uploadResult = await uploadToCloudinary(file.path, { folder: "products" });

                imageData.push({
                    url: uploadResult.secure_url,
                    public_id: uploadResult.public_id
                });

                await deleteUploadedFile(file.path);
            }
        } else {
            // Optional default
            imageData.push({
                url: "/uploads/default.png",
                public_id: "default"
            });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            category,
            image: imageData
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Fetching product with ID:", id);
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                    success: false,
                    message: "Product not found" 
                });
        }
        res.status(200).json({
            success: true, 
            message: "Product fetched successfully", 
            product
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,    
            message: error.message
        });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message
         });
    }
}

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category: category });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found in this category" 
            });
        }       
        res.status(200).json({
            success: true,
            message: `Products in category '${category}' fetched successfully`,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
         });
    }   
}

//search products by name or description
export const searchProducts = async (req, res) => {
    try {
        const { query } = req.params; 
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        }); 
        res.status(200).json({
            success: true,
            message: `Products matching '${query}' fetched successfully`,
            products
        });
    }               
    catch (error) {
        res.status(500).json({
            success: false,             
            message: error.message
        });
    }

}   

//update product details
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const replaceIndex = req.body.replaceIndex; // optional index to replace
        const newImages = req.files || [];

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // -----------------------------------------
        // HANDLE STOCK STATUS
        // -----------------------------------------
        if (updates.stock !== undefined) {
            updates.isActive = updates.stock > 0;
        }

        // -----------------------------------------
        // IF NEW IMAGES WERE UPLOADED
        // -----------------------------------------
        if (newImages.length > 0) {

            // A) PRODUCT HAS LESS THAN 5 IMAGES → APPEND
            if (product.image.length < 5) {

                const slotsLeft = 5 - product.image.length;
                const allowedImages = newImages.slice(0, slotsLeft);

                for (const file of allowedImages) {
                    const uploadResult = await uploadToCloudinary(file.path, { folder: "products" });

                    product.image.push({
                        url: uploadResult.secure_url,
                        public_id: uploadResult.public_id
                    });

                    await deleteUploadedFile(file.path);
                }
            }

            // B) PRODUCT ALREADY HAS 5 IMAGES → NEED replaceIndex
            else {
                if (replaceIndex === undefined) {
                    return res.status(400).json({
                        success: false,
                        message: "Product has 5 images. Provide replaceIndex to overwrite."
                    });
                }

                const index = parseInt(replaceIndex);
                if (isNaN(index) || index < 0 || index > 4) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid replaceIndex. Must be 0–4."
                    });
                }

                const oldImage = product.image[index];

                // Delete old image from Cloudinary
                if (oldImage && oldImage.public_id) {
                    await deleteFromCloudinary(oldImage.public_id);
                }

                // Upload the first new image (only 1 allowed when replacing)
                const file = newImages[0];
                const uploadResult = await uploadToCloudinary(file.path, { folder: "products" });

                product.image[index] = {
                    url: uploadResult.secure_url,
                    public_id: uploadResult.public_id
                };

                await deleteUploadedFile(file.path);
            }
        }

        // -----------------------------------------
        // APPLY OTHER FIELD UPDATES
        // -----------------------------------------
        Object.assign(product, updates);

        await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
     

//delete product from database
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {                                              
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product: deletedProduct
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}