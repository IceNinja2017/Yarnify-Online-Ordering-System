import Cart from "../models/Cart.js";

export const newOrderCOD = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      paymentMethod: "COD",
    });
    await newOrder.save();
    await Cart.deleteOne({ userId: userId });

    res.status(200).json({ message: "Order placed (COD)", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const addToCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    let cart = await Cart.findOne({ userId: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = items;
    cart.totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createNewCart = async (req, res) => {
    const userId = req.param.userId;


}
