import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";   // <-- ADD THIS

const CartBubble = ({ onClose, userId }) => {
    const bubbleRef = useRef(null);
    const navigate = useNavigate();               // <-- ADD THIS

    const [cart, setCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const fetchCart = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5001/api/payment/cart/${userId}`,
                    { withCredentials: true }
                );

                setCart(data);
                const items = data.items || [];

                const itemsWithNames = await Promise.all(
                    items.map(async (item) => {
                        try {
                            const res = await axios.get(
                                `http://localhost:5002/api/products/get-product/${item.productId}`
                            );
                            return { ...item, name: res.data.product.name };
                        } catch {
                            return { ...item, name: "Unknown Product" };
                        }
                    })
                );

                setCartItems(itemsWithNames);
            } catch (err) {
                console.error("Failed to load cart:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [userId]);

    const changeQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await axios.put(
                `http://localhost:5001/api/payment/update-item-quantity/${userId}/${productId}`,
                { quantity: newQuantity },
                { withCredentials: true }
            );

            setCartItems((prev) =>
                prev.map((item) =>
                    item.productId === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (err) {
            console.error("Failed to update quantity:", err);
        }
    };

    const handleCheckout = () => {
        if (!cart?._id) return;
        navigate(`/check-out/${cart._id}`);        // <-- Navigate to checkout page
    };

    return (
        <div
            ref={bubbleRef}
            className="absolute right-4 top-16 bg-white shadow-lg rounded-xl p-4 w-64 z-[10000] border border-[#d3ab9e]"
        >
            <h3 className="text-lg font-semibold text-[#916556] mb-3">Your Cart</h3>

            {loading && <p className="text-[#BD8F80]">Loading...</p>}
            {!loading && cartItems.length === 0 && (
                <p className="text-[#BD8F80]">Your cart is empty.</p>
            )}

            {!loading && cartItems.length > 0 && (
                <ul className="space-y-2">
                    {cartItems.map((item) => (
                        <li
                            key={item.productId}
                            className="flex justify-between items-center text-sm text-[#916556] bg-[#fffbff] p-2 rounded-lg border border-[#efd7d0]"
                        >
                            <span>{item.name}</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => changeQuantity(item.productId, item.quantity - 1)}
                                    className="px-2 py-1 bg-[#d3ab9e] text-white rounded"
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => changeQuantity(item.productId, item.quantity + 1)}
                                    className="px-2 py-1 bg-[#d3ab9e] text-white rounded"
                                >
                                    +
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* CHECKOUT BUTTON */}
            {cartItems.length > 0 && (
                <button
                    onClick={handleCheckout}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                    Checkout
                </button>
            )}

            <button
                onClick={onClose}
                className="mt-2 w-full bg-[#d3ab9e] text-white py-2 rounded-lg hover:bg-[#BD8F80]"
            >
                Close
            </button>
        </div>
    );
};

export default CartBubble;
