import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  paymentMethod: { 
    type: String, 
    enum: ["COD", "PayPal"], 
    default: "COD" 
  },
  paypalOrderId: {
    type: String,
    default: null
  },
  paymentStatus: {
    type: String, 
    enum: ["Paid", "Unpaid", "Canceled"], 
    default: "Unpaid" 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Shipped", "Completed", "Canceled"], 
    default: "Pending" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("Order", orderSchema);
