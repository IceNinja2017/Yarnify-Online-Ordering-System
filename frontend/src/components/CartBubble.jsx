import { useEffect, useRef, useState } from "react";
import axios from "axios";

const CartBubble = ({ onClose, userId }) => {
    const bubbleRef = useRef(null);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch cart items on open
    useEffect(() => {
        if (!userId) return;

        axios
            .get(`http://localhost:5001/api/payment/cart/${userId}`, { withCredentials: true })
            .then((res) => {
                setCartItems(res.data.items || []);
            })
            .catch((err) => {
                console.error("Failed to load cart:", err);
            })
            .finally(() => setLoading(false));
    }, [userId]);

    // Close bubble when clicking outside
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (bubbleRef.current && !bubbleRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [onClose]);

    return (
        <div
            ref={bubbleRef}
            className="absolute right-4 top-16 bg-white shadow-lg rounded-xl p-4 w-64 z-[10000] border border-[#d3ab9e]"
        >
            <h3 className="text-lg font-semibold text-[#916556] mb-3">Your Cart</h3>

            {/* Loading */}
            {loading && <p className="text-[#BD8F80]">Loading...</p>}

            {/* Empty cart */}
            {!loading && cartItems.length === 0 && (
                <p className="text-[#BD8F80]">Your cart is empty.</p>
            )}

            {/* Items List */}
            {!loading && cartItems.length > 0 && (
                <ul className="space-y-2">
                    {cartItems.map((item) => (
                        <li
                            key={item._id}
                            className="flex justify-between items-center text-sm text-[#916556] bg-[#fffbff] p-2 rounded-lg border border-[#efd7d0]"
                        >
                            <span>{item.productName}</span>
                            <span>x{item.quantity}</span>
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={onClose}
                className="mt-4 w-full bg-[#d3ab9e] text-white py-2 rounded-lg hover:bg-[#BD8F80]"
            >
                Close
            </button>
        </div>
    );
};

export default CartBubble;