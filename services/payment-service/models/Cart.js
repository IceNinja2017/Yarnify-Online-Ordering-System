import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true 
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      }
    }
  ],
  
  totalAmount: Number
});

export default mongoose.model("Cart", cartSchema);


/*

productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
*/