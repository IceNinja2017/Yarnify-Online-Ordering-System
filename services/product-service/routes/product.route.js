import express from "express";
import { addProduct, dummyFunction, getProductById, getAllProducts, getProductsByCategory, searchProducts, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { get } from "mongoose";
import { uploadMultipleFiles, uploadSingleFile } from "../middleware/fileHandling.js";

const router = express.Router();

//Get All Products
router.get("/all-products", getAllProducts);  

//Products by specified ID
router.get("/get-product/:id", getProductById) 

//Get Products by Category
router.get("/category/:category", getProductsByCategory)

//Search Products
router.get("/search/:query", searchProducts);

//Add Product to Database
router.post("/product",  uploadSingleFile('image'), addProduct);
router.post("/product",  uploadMultipleFiles('image', 5), addProduct);

//Delete Product from Database
router.delete("/product/:id", deleteProduct);

//Update Product in Database
router.put("/product/:id", updateProduct);





export default router;