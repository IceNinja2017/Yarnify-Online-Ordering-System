import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const getUserOrders = async (req, res) => {
  const userId = req.params.userId

  try {
    const orders = await Order.find({ userId: userId });
    if (!orders) return  res.status(404).json({ message: "No Orders found" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.orderId;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const newOrderCOD = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId: userId });
    console.log(cart);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      paymentMethod: "COD",
    });
    await newOrder.save();

    cart.items = [];
    cart.save()

    res.status(200).json({ message: "Order placed (COD)", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//newOrderPaypal
export const newOrderPaypal = async (req, res) => {
  try {
    const { userId, paymentDetails } = req.body;
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });


    // Here you would integrate with PayPal SDK to process payment
    //
    //
    //


    const paymentSuccess = true; // Simulate payment success




    if (!paymentSuccess) {
        return res.status(400).json({ message: "Payment failed" });
    }

    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      paymentMethod: "PayPal",
    });
    await newOrder.save();
    await Cart.deleteOne({ userId: userId }); //dili ni mao dapat ma delete ra ang items sa cart dili ang Cart mismo


    res.status(200).json({ message: "Order placed (PayPal)", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


//getAllOrders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();  
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
}
//getOrderById
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);  
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
    } catch (error) {       
    res.status(500).json({ message: error.message });
    }
}
//getOrdersByStatus
export const getOrdersByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const orders = await Order.find({ status: status });
    res.status(200).json(orders);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}

