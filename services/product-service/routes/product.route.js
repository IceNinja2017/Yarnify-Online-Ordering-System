import express from "express";
import { dummyFunction } from "../controllers/product.controller.js";

const router = express.Router();

//Get All Products
router.get("/products", dummyFunction) 

//Products by specified ID
router.get("/products/:id", dummyFunction) 

//Get Products by Category
router.get("/category/:category", dummyFunction)

//Search Products
router.get("/search/:query", dummyFunction);

//Add Product to Database
router.post("/product", dummyFunction);

//Delete Product from Database
router.delete("/product", dummyFunction);

//Update Product in Database
router.put("/product", dummyFunction);





export default router;