import Cart from "../models/Cart.js";
import axios from "axios";

export const addToCart = async (req, res) => {
  try {
    const { userId, item } = req.body;

    let cart = await Cart.findOne({ userId: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.concat(item);
    
    cart.totalAmount = item.price * item.quantity + (cart.totalAmount || 0);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createNewCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await axios.get(`http://localhost:5000/api/auth/${userId}`);
        if(response.data.success === false){
            return res.status(404).json({ message: "User not found" });
        }

        const existingCart = await Cart.findOne({ userId: userId });
        if (existingCart) {
            return res.status(400).json({ message: "Cart already exists for this user" });
        }

        const newCart = new Cart({
            userId: userId,
            items: [],
            totalAmount: 0
        });
        await newCart.save();

        res.status(200).json({ 
            message: "Cart created successfully", 
            cart: newCart 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//remove item from cart
export const removeItemFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.params;      
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        const item = cart.items[itemIndex];
        cart.totalAmount -= item.price * item.quantity;
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update item quantity in cart
export const updateItemQuantityInCart = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const { quantity } = req.body;
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        cart.totalAmount += (quantity - item.quantity) * item.price;
        item.quantity = quantity;
        await cart.save();
        res.status(200).json({ message: "Item quantity updated", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get cart by userId
export const getCartByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//clear cart after order is placed
export const clearCartByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;   
        await Cart.deleteOne({ userId: userId });
        res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
