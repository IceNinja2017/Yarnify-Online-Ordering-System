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
        //multer upload logic can be added here
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.path, { folder: "products" });
            imageData.push({
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id
            });
            await deleteUploadedFile(req.file.path);
        } else if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const uploadResult = await uploadToCloudinary(file.path, { folder: "products" });
                imageData.push({
                    url: uploadResult.secure_url,
                    public_id: uploadResult.public_id
                });
                await deleteUploadedFile(file.path);
            }
        } else if (req.body.image) {
            // If image info comes directly in body (JSON)
            imageData.push({
                url: req.body.image.url,
                public_id: req.body.image.public_id
            });
        } else {
            // Optional: default image
            imageData.push({
                url: "/uploads/default.png",
                public_id: "default"
            });
        }

        //cloudinary upload logic can be added here in future


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
            product: newProduct });
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
        
        if (updates.stock !== undefined) {
            updates.isActive = updates.stock > 0;
        }
        //multer update logic
        //cloudinary update logic

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            updates,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            //multer delete temporary local file if any cloudinary upload is done

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        } 
        
        //cloudinary delete logic can be added here in future
        //multer delete temporary local file if any cloudinary upload is done

        res.status(200).json({
            success: true,
            message: "Product updated successfully",        
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }           
}       

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