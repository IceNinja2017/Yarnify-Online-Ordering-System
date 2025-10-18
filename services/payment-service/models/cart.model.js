import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Links to Product model
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    name: { type: String, required: true } // Store name/price to avoid looking up Product service constantly
});

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true }, // Links to User model
    items: [cartItemSchema],
    totalPrice: { type: Number, default: 0 },
}, { timestamps: true });

// Automatically calculate total price before saving the cart
cartSchema.pre('save', function(next) {
  this.totalPrice = this.items.reduce((total, item) => total + (item.quantity * item.price), 0);
  next();
});

export const Cart = mongoose.model('Cart', cartSchema);