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
  status: { 
    type: String, 
    enum: ["Pending", "Shipped", "Completed"], 
    default: "Pending" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("Order", orderSchema);
