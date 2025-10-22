import express from "express";
import { authenticate, isAdmin } from "../middleware/authorize.js";
import * as controller from "../controllers/payment.controller.js";

const router = express.Router();

router.get("/cart", authenticate, controller.getCart);
router.post("/cart/add", authenticate, controller.addToCart);

router.post("/checkout/cod", authenticate, controller.checkoutCOD);
router.post("/paypal/create-order", authenticate, controller.createPaypalOrder); // Simulate Step 1
router.post("/paypal/capture-order", authenticate, controller.capturePaypalOrder); // Simulate Step 2

router.get("/orders", authenticate, controller.getUserOrders);
router.get("/orders/:orderId", authenticate, controller.getOrderById);

router.put("/orders/:orderId/status", authenticate, isAdmin, controller.updateOrderStatus);

export default router;