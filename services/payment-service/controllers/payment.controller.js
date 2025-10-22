import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { sendOrderStatusEmail } from "../utils/email.js";
import mongoose from 'mongoose';

const createOrderAndClearCart = async (userId, paymentMethod, shippingAddress, transactionId = null) => {
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) throw new Error("Cart is empty.");
    const order = new Order({
        userId,
        items: cart.items.map(item => ({ ...item.toObject() })),
        totalAmount: cart.totalPrice,
        paymentMethod,
        shippingAddress,
        ...(transactionId && { transactionId })
    });
    await order.save();
    cart.items = [];
    await cart.save();
    return order;
};

export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
            await cart.save();
        } else {
            cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error getting cart", error: error.message });
    }
};

export const addToCart = async (req, res) => {
    const { productId, quantity, price, name } = req.body;
    const userId = req.user.id;
    if (!productId || !quantity || !price || !name) return res.status(400).json({ message: "Missing product details" });
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) cart = new Cart({ userId, items: [] });
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += Number(quantity);
        } else {
            cart.items.push({ productId, name, price: Number(price), quantity: Number(quantity) });
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
};

export const checkoutCOD = async (req, res) => {
    const { shippingAddress } = req.body;
    if (!shippingAddress?.street || !shippingAddress?.city || !shippingAddress?.country) {
        return res.status(400).json({ message: "Valid shipping address required." });
    }
    try {
        const order = await createOrderAndClearCart(req.user.id, "Cash on Delivery", shippingAddress);
        await sendOrderStatusEmail(req.user.email, order);
        res.status(201).json({ message: "Order placed (COD)!", order });
    } catch (error) {
        res.status(500).json({ message: "COD Checkout failed", error: error.message });
    }
};

export const createPaypalOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart || cart.totalPrice <= 0) {
             return res.status(400).json({ message: "Cart empty/no value." });
        }
        console.log(`[Simulate PayPal Process Step 1] Calculating amount: ${cart.totalPrice.toFixed(2)} PHP`);
        const simulatedPaypalOrderId = `SIM_PAYPAL_${Date.now()}`;
        console.log(`[Simulate PayPal Process Step 1] Generated simulated Order ID: ${simulatedPaypalOrderId}`);
        console.log("[Simulate PayPal Process Step 1] Sending simulated Order ID to frontend.");
        res.status(200).json({ orderId: simulatedPaypalOrderId });
    } catch (error) {
         console.error("Error simulating PayPal order creation:", error.message);
         res.status(500).json({ message: "Failed to simulate PayPal order creation", error: error.message });
    }
};

export const capturePaypalOrder = async (req, res) => {
    const { simulatedPaypalOrderId, shippingAddress } = req.body;
    if (!simulatedPaypalOrderId || !shippingAddress?.street || !shippingAddress?.city || !shippingAddress?.country) {
        return res.status(400).json({ message: "PayPal Order ID & valid shipping address required." });
    }
    try {
        console.log(`[Simulate PayPal Process Step 2] Received simulated Order ID from frontend: ${simulatedPaypalOrderId}`);
        console.log("[Simulate PayPal Process Step 2] Pretending to verify payment capture with PayPal...");
        const isCaptureSuccessful = true; // Simulate successful capture
        console.log(`[Simulate PayPal Process Step 2] Simulated capture status: ${isCaptureSuccessful ? 'COMPLETED' : 'FAILED'}`);

        if (!isCaptureSuccessful) {
             throw new Error('Simulated PayPal payment capture failed.');
        }

        const transactionId = `SIM_CAPTURE_${Date.now()}`;
        console.log(`[Simulate PayPal Process Step 2] Generated simulated Transaction ID: ${transactionId}`);

        const order = await createOrderAndClearCart(
            req.user.id,
            "PayPal (Simulated)",
            shippingAddress,
            transactionId
        );

        console.log(`[Simulate PayPal Process Step 2] Created internal order ${order._id} after simulated capture.`);
        await sendOrderStatusEmail(req.user.email, order);
        res.status(201).json({ message: "Simulated PayPal payment captured! Order placed.", order });

    } catch (error) {
        console.error("Simulated PayPal capture failed:", error.message);
        res.status(500).json({ message: "Simulated PayPal capture failed", error: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order history", error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.orderId, userId: req.user.id });
        if (!order) return res.status(404).json({ message: "Order not found or access denied." });
        res.status(200).json(order);
    } catch (error) {
         if (error instanceof mongoose.Error.CastError) return res.status(400).json({ message: "Invalid order ID."});
        res.status(500).json({ message: "Error fetching order details", error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    const validStatuses = ["Pending", "Shipped", "Completed", "Cancelled"];
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status. Use one of: ${validStatuses.join(', ')}` });
    }
    try {
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found." });
        order.status = status;
        await order.save();
        let userEmail = null;
        try {
             const User = mongoose.model('User');
             const orderUser = await User.findById(order.userId).select('email');
             if (orderUser?.email) userEmail = orderUser.email;
        } catch (userError) { console.error("Could not get user email for notification:", userError.message); }
        if(userEmail) await sendOrderStatusEmail(userEmail, order);
        else console.warn(`Did not send status update email for order ${orderId}, user email not found.`);
        res.status(200).json({ message: `Order status updated to ${status}`, order });
    } catch (error) {
         if (error instanceof mongoose.Error.CastError) return res.status(400).json({ message: "Invalid order ID."});
        res.status(500).json({ message: "Error updating order status", error: error.message });
    }
};