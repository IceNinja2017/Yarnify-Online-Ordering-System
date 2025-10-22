import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();


router.post("/cart", async (req, res) => {
  try {
    const { userId, items } = req.body;

    
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items, totalAmount: 0 });
    } else {
      cart.items = items; 
    }

    
    cart.totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Item(s) added to cart successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
