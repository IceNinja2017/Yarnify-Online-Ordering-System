export const addToCart = async (req, res) => {
  try {
    const { productId, name, price, quantity, userId } = req.body;

    
    const currentUserId = userId || "66fb6c9b1234567890abcdee";

    let cart = await Cart.findOne({ userId: currentUserId });

    if (!cart) {
      cart = new Cart({ userId: currentUserId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};
