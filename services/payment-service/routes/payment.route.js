import express from "express";
import { validateToken } from "../middleware/auth.js";
import { getUserOrders, updatedOrderById, newOrderCOD, getAllOrders, getOrdersByStatus} from "../controllers/order.controller.js"
import { addToCart, createNewCart, removeItemFromCart, updateItemQuantityInCart, getCartByUserId } from "../controllers/cart.controller.js"

const router = express.Router();

//add to cart
router.post("/add-to-cart", addToCart);

//add new cod Order
router.post("/cod",validateToken, newOrderCOD);



//get order from user id
router.get("/orders", getAllOrders);

router.get("/order-status/:status", getOrdersByStatus);

//get all orders (Admin)
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

export default router;
