import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Cash on Delivery
router.post("/cod", verifyToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      paymentMethod: "COD",
    });
    await newOrder.save();
    await Cart.deleteOne({ userId });

    res.status(200).json({ message: "Order placed (COD)", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
