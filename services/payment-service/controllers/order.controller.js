import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import axios from "axios";

import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../../config/loadEnv.js";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import { json } from "stream/consumers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFileURL = pathToFileURL(path.join(__dirname, "../.env")).href;

loadEnv(envFileURL, dotenvFlow);

const getAccessTokenFromPayPal = async () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET; 
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  console.log("Getting PayPal access token with clientId:", clientId);
  console.log("Getting PayPal access token with clientSecret:", clientSecret);

  try {
    const response = await axios.post(
      `${process.env.PAYPAL_API_BASE}/v1/oauth2/token`,
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data.access_token;
  }
  catch (error) {
    console.error('Error obtaining PayPal access token:', error.response ? error.response.data : error.message);
    throw new Error('Could not obtain PayPal access token');
  }
};

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
    if (cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      paymentMethod: "COD",
    });
    await newOrder.save();

    cart.items = []
    cart.totalAmount = 0
    await cart.save()

    res.status(200).json({ message: "Order placed (COD)", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//new paypal order
export const newOrderPaypal = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    if (cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const accessToken = await getAccessTokenFromPayPal();

    // Create PayPal order
    const response = await axios.post(
      `${process.env.PAYPAL_API_BASE}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "PHP",
              value: cart.totalAmount.toFixed(2),
            },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
              payment_method_selected: "PAYPAL",
              brand_name: "Yarnify Online Ordering System",
              locale: "en-US",
              landing_page: "BILLING",
              user_action: "PAY_NOW",
              return_url: `${process.env.PAYPAL_REDIRECT_URL_BASE}/return`,
              cancel_url: `${process.env.PAYPAL_REDIRECT_URL_BASE}/cancel`,
            },
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract approval URL
    const approvalUrl = response.data.links.find(link => link.rel === "payer-action")?.href;
    if (!approvalUrl) return res.status(500).json({ message: "No approval URL returned by PayPal" });

    // Save order in database including PayPal order ID
    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      paymentMethod: "PayPal",
      paypalOrderId: response.data.id, // <-- Save PayPal order ID here
      paymentStatus: "Unpaid",
    });
    await newOrder.save();

    // Clear cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    // Return approval URL to frontend
    res.status(200).json({ approvalUrl, order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


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

//capture paypal order
export const capturePaypalOrder = async (req, res) => {
  try {
    const { orderId, payerId } = req.body; // PayPal order ID
    const accessToken = await getAccessTokenFromPayPal();

    // Capture payment with PayPal
    const response = await axios.post(
      `${process.env.PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("PayPal Capture Response:", response.data);

    // Find order by PayPal order ID
    const order = await Order.findOne({ paypalOrderId: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update payment status
    order.paymentStatus = "Paid";
    await order.save();

    res.status(200).json({
      message: "Payment captured successfully and order marked as Paid",
      order,
      paypalResponse: response.data,
    });
  } catch (error) {
    console.error(
      "Error capturing PayPal order:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Error capturing PayPal order" });
  }
};

export const cancelPaypalOrder = async (req, res) => {
  try {
    const { paypalOrderId } = req.body;

    const order = await Order.findOne({ paypalOrderId });
    console.log(order.data)
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.paymentStatus === "Unpaid") {
      order.paymentStatus = "Canceled";
      order.status = "Canceled";
      await order.save();
    }

    res.status(200).json({ message: "Order marked as canceled", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to cancel order" });
  }
};