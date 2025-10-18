import express from "express";
// Import your middleware functions
import { authenticate, isAdmin } from "../middleware/authorize.js";
// Import all your controller functions
import * as controller from "../controllers/payment.controller.js";

const router = express.Router(); // Create an Express router

// --- Cart Routes --- Requires user to be logged in (authenticate)
router.get("/cart", authenticate, controller.getCart);
router.post("/cart/add", authenticate, controller.addToCart);

// --- Checkout Routes --- Requires user to be logged in
router.post("/checkout/cod", authenticate, controller.checkoutCOD); // For Cash on Delivery
router.post("/paypal/create-order", authenticate, controller.createPaypalOrder); // For PayPal Step 1
router.post("/paypal/capture-order", authenticate, controller.capturePaypalOrder); // For PayPal Step 2

// --- Order Tracking Routes --- Requires user to be logged in
router.get("/orders", authenticate, controller.getUserOrders); // Get list of user's orders
router.get("/orders/:orderId", authenticate, controller.getOrderById); // Get details of one specific order

// --- Admin Route --- Requires user to be logged in AND be an admin (authenticate & isAdmin)
router.put("/orders/:orderId/status", authenticate, isAdmin, controller.updateOrderStatus);

export default router; // Export the router to be used in index.js