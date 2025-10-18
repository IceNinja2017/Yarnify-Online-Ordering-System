import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Completed", "Cancelled"],
        default: "Pending",
    },
    paymentMethod: {
        type: String,
        enum: ["Cash on Delivery", "PayPal (Simulated)"],
        required: true,
    },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String, required: true }
    },
    transactionId: { type: String } // For simulated PayPal ID
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);