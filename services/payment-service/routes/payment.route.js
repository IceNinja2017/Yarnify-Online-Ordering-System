import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUserOrders, updatedOrderById, newOrderCOD } from "../controllers/order.controller.js"
import { addToCart, createNewCart } from "../controllers/cart.controller.js"

const router = express.Router();

//add to cart
router.post("/add-to-cart", addToCart);

//add new cod Order
router.post("/cod", verifyToken, newOrderCOD);

//get order from user id
router.get("/orders/:userId", getUserOrders);

// Update order status (Admin)
router.put("/update/:orderId", updatedOrderById);

router.post("/create-new-cart/:userId", createNewCart);
//remove item from cart
router.delete("/remove-item/:userId/:itemId", removeItemFromCart); 
//update item quantity in cart
router.put("/update-item-quantity/:userId/:itemId", updateItemQuantityInCart);
//get cart by userId
router.get("/cart/:userId", getCartByUserId);
//clear cart after order is placed
router.delete("/clear-cart/:userId", clearCartByUserId);

export default router;
