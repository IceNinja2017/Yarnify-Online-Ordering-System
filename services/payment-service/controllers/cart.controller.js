import Cart from "../models/Cart.js";
import axios from "axios";

import dotenvFlow from "dotenv-flow";
import { loadEnv } from "../../config/loadEnv.js";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFileURL = pathToFileURL(path.join(__dirname, "../.env")).href;

loadEnv(envFileURL, dotenvFlow);

const AuthPort = process.env.AuthenticationService_PORT
const ProductPort = process.env.ProductService_PORT

export const addToCart = async (req, res) => {
  try {
    const { userId, item } = req.body;

    let cart = await Cart.findOne({ userId: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productResponse = await axios.get(`http://localhost:${ProductPort}/api/products/get-product/${item.productId}`);

    if (productResponse.data.success === false) {
        return res.status(404).json({ message: "Product not found" });
    }

    console.log('Product Response:', productResponse.data.product);

    let existingItemIndex = cart.items.findIndex(cartItem => cartItem.productId.toString() === item.productId);

    if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += item.quantity;
        cart.totalAmount += productResponse.data.product.price * item.quantity;
        await cart.save();
        return res.status(200).json(cart);
    }
    
    cart.totalAmount += productResponse.data.product.price * item.quantity;
    cart.items.push(item);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createNewCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('AuthPort =', AuthPort);
        const response = await axios.get(`http://localhost:${AuthPort}/api/auth/${userId}`);
        console.log(AuthPort)
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
        
        const productResponse = await axios.get(`http://localhost:${ProductPort}/api/products/get-product/${itemId}`);
        if (productResponse.data.success === false) {
            return res.status(404).json({ message: "Product not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        const item = cart.items[itemIndex];
        cart.totalAmount -= productResponse.data.product.price * item.quantity;
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update item quantity in cart
export const reduceItemQuantityInCart = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const { quantity } = req.body;

        const productResponse = await axios.get(`http://localhost:${ProductPort}/api/products/get-product/${itemId}`);
        if (productResponse.data.success === false) {
            return res.status(404).json({ message: "Product not found" });
        }

        const cart = await Cart.findOne({ userId: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(item => item.productId.toString() === itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        cart.totalAmount += (quantity - item.quantity) * productResponse.data.product.price;
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
