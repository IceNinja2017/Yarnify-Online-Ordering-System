    import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to the user who placed the order
    items: [orderItemSchema], // List of items ordered
    totalAmount: { type: Number, required: true }, // Final price
    status: { // Order status tracking
        type: String,
        enum: ["Pending", "Shipped", "Completed", "Cancelled"],
        default: "Pending",
    },
    paymentMethod: { // How the user paid
        type: String,
        enum: ["Cash on Delivery", "PayPal (Simulated)"],
        required: true,
    },
    shippingAddress: { // Where the order should be delivered
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String, required: true }
    },
    transactionId: { type: String } // To store the simulated PayPal ID
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

export const Order = mongoose.model('Order', orderSchema);