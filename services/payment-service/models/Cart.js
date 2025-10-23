import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true 
  },

  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  
  totalAmount: Number
});

export default mongoose.model("Cart", cartSchema);
