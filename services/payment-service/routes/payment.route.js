import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUserOrder, updatedOrderById } from "../controllers/order.controller.js"
import { newOrderCOD, addToCart, createNewCart } from "../controllers/cart.controller.js"

const router = express.Router();

//add to cart
router.post("/add-to-cart", addToCart);

//add new cod Order
router.post("/cod", verifyToken, newOrderCOD);

//get order from user id
router.get("/orders/:userId", getUserOrder);

// Update order status (Admin)
router.put("/update/:orderId", updatedOrderById);

router.post("/create-new-cart/:userId", createNewCart);

export default router;
