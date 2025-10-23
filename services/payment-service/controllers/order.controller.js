import Order from "../models/Order.js";

export const getUserOrder = async (req, res) => {
  const userId = req.params.userId

  try {
    const orders = await Order.find({ userId: userId });
    if (!orders) return  res.status(404).json({ message: "No Orders found" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updatedOrderById = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.orderId;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}