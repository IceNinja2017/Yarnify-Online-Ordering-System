import Product from "../models/product.model.js";

export const dummyFunction = (req, res) => {
    res.status(200).json({ message: "Dummy function works!" });
}

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, image } = req.body;
        console.log(req.body);
        //multer upload logic can be added here

        //cloudinary upload logic can be added here in future

        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            category,
            image: {
                url: image.url,
                public_id: image.public_id
            }
        });

        //delete temporary local file if any cloudinary upload is done

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

//update product details

//delete product from database