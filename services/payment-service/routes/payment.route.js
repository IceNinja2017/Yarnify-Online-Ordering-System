import express from "express";
import { validateToken } from "../middleware/auth.js";
import { getUserOrders, updateOrderStatus, newOrderCOD, getAllOrders, getOrdersByStatus,newOrderPaypal, capturePaypalOrder, cancelPaypalOrder} from "../controllers/order.controller.js"
import { addToCart, createNewCart, removeItemFromCart, reduceItemQuantityInCart, getCartByUserId } from "../controllers/cart.controller.js"

const router = express.Router();

//add to cart
router.post("/add-to-cart", addToCart);

//add new cod Order
router.post("/cod",validateToken, newOrderCOD);

//add new paypal order
router.post("/paypal", validateToken, newOrderPaypal);

router.post("/capture-paypal-order", validateToken, capturePaypalOrder);

router.post("/cancel-paypal-order", validateToken, cancelPaypalOrder);
//get order from user id
router.get("/orders", getAllOrders);

//get orders by status (Admin)
router.get("/order-status/:status", getOrdersByStatus);

//get all orders (Admin)
router.get("/orders/:userId", getUserOrders);

// Update order status (Admin)
router.put("/update/:orderId", updateOrderStatus);

//create new cart
router.post("/create-new-cart/:userId", createNewCart);

//remove item from cart
router.delete("/remove-item/:userId/:itemId", removeItemFromCart); 

//update item quantity in cart
router.put("/update-item-quantity/:userId/:itemId", reduceItemQuantityInCart);

//get cart by userId
router.get("/cart/:userId", getCartByUserId);

export default router;
