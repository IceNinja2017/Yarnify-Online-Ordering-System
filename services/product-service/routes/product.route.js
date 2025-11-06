import express from "express";
import { addProduct, dummyFunction, getProductById, getAllProducts, getProductsByCategory } from "../controllers/product.controller.js";
import { get } from "mongoose";

const router = express.Router();

//Get All Products
router.get("/all-products", getAllProducts);  

//Products by specified ID
router.get("/get-product/:id", getProductById) 

//Get Products by Category
router.get("/category/:category", getProductsByCategory)

//Search Products
router.get("/search/:query", dummyFunction);

//Add Product to Database
router.post("/product", addProduct);

//Delete Product from Database
router.delete("/product", dummyFunction);

//Update Product in Database
router.put("/product", dummyFunction);





export default router;