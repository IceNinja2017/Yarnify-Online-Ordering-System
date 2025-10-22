import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { userId, items } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items, totalAmount: 0 });

    cart.items = items;
    cart.totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
