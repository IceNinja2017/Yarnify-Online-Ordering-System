import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUserOrders, updatedOrderById, newOrderCOD, newOrderPaypal, getAllOrders, getOrderById, getOrdersByStatus, } from "../controllers/order.controller.js"
import { addToCart, createNewCart, removeItemFromCart, updateItemQuantityInCart, getCartByUserId,  clearCartByUserId, } from "../controllers/cart.controller.js"
import { createPayPalOrder, capturePayPalOrder } from "../controllers/paypal.controller.js";



const router = express.Router();

//add to cart
router.post("/add-to-cart", addToCart);
//add new cod Order
router.post("/cod", verifyToken, newOrderCOD);
//get order from user id
router.get("/orders/:userId", getUserOrders);
// Update order status (Admin)
router.put("/update/:orderId", updatedOrderById);
//create new cart for user
router.post("/create-new-cart/:userId", createNewCart);
//remove item from cart
router.delete("/remove-item/:userId/:itemId", removeItemFromCart); 
//update item quantity in cart
router.put("/update-item-quantity/:userId/:itemId", updateItemQuantityInCart);
//get cart by userId
router.get("/cart/:userId", getCartByUserId);
//clear cart after order is placed
router.delete("/clear-cart/:userId", clearCartByUserId);
//get all orders (Admin)
router.get("/all-orders", getAllOrders);
//get order by id (Admin)
router.get("/order/:orderId", getOrderById);
//get orders by status (Admin)
router.get("/orders/status/:status", getOrdersByStatus);
//add new paypal Order
router.post("/paypal", verifyToken, newOrderPaypal);
//create PayPal order
router.post("/paypal/create-order", verifyToken, createPayPalOrder);
//capture PayPal order
router.post("/paypal/capture-order", verifyToken, capturePayPalOrder);
export default router;
