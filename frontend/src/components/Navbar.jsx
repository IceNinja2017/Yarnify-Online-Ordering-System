import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Menu, X, ShoppingCart } from "lucide-react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// ✅ import your CartBubble component
import CartBubble from "../components/CartBubble";

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const { isLoggedIn, setIsLoggedIn, userId } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/auth/me", { withCredentials: true })
            .then((res) => setIsLoggedIn(res.data.loggedIn))
            .catch(() => setIsLoggedIn(false));
    }, []);

    const handleLogout = () => {
        axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <nav className="bg-[#ebd8d0] shadow-md relative z-[9999]">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-[#916556]">Yarnify</h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {!isLoggedIn ? (
                            <>
                                <a href="/" className="text-[#BD8F80] hover:text-[#d3ab9e] font-medium">Home</a>
                                <a href="/shop" className="text-[#BD8F80] hover:text-[#d3ab9e] font-medium">Shop</a>
                                <a href="/about" className="text-[#BD8F80] hover:text-[#d3ab9e] font-medium">About</a>
                                <a href="/contact" className="text-[#BD8F80] hover:text-[#d3ab9e] font-medium">Contact</a>

                                <div className="flex w-max overflow-hidden border border-[#d3ab9e]">
                                    <a href="/login" className="bg-[#d3ab9e] text-white px-6 py-2 rounded-l-full hover:bg-[#BD8F80] transition">Login</a>
                                    <a href="/register" className="bg-[#d3ab9e] text-white px-6 py-2 rounded-r-full hover:bg-[#BD8F80] transition">Register</a>
                                </div>
                            </>
                        ) : (
                            <>
                                <a href="/dashboard" className="text-[#BD8F80] hover:text-[#d3ab9e] font-medium">Dashboard</a>
                                <a href="/orders" className="text-[#BD8F80] hover:text-[#d3ab9e] font-medium">Orders</a>
                                <a href="/profile" className="text-[#BD8F80] hover:text-[#d3ab9e] font-medium">Profile</a>

                                {/* Cart Icon */}
                                <button
                                    onClick={() => setShowCart(!showCart)}
                                    className="text-[#BD8F80] hover:text-[#d3ab9e]"
                                >
                                    <ShoppingCart size={24} />
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="bg-[#d3ab9e] text-white px-4 py-2 rounded-xl hover:bg-[#BD8F80] transition"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu + Cart */}
                    <div className="md:hidden flex items-center space-x-4">

                        {isLoggedIn && (
                            <button
                                onClick={() => setShowCart(!showCart)}
                                className="text-[#BD8F80]"
                            >
                                <ShoppingCart size={26} />
                            </button>
                        )}

                        <button onClick={() => setIsOpen(!isOpen)} className="text-[#BD8F80]">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ✅ Use your CartBubble component */}
            {showCart && (
                <CartBubble onClose={() => setShowCart(false)} userId={userId} />
            )}

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-[#ebd8d0] px-4 pb-4 space-y-2">
                    {!isLoggedIn ? (
                        <>
                            <a href="/" className="block text-[#BD8F80] font-medium">Home</a>
                            <a href="/shop" className="block text-[#BD8F80] font-medium">Shop</a>
                            <a href="/about" className="block text-[#BD8F80] font-medium">About</a>
                            <a href="/contact" className="block text-[#BD8F80] font-medium">Contact</a>
                            <a href="/login" className="block bg-[#d3ab9e] text-white text-center py-2 rounded-xl hover:bg-[#BD8F80] transition">Login</a>
                            <a href="/register" className="block bg-[#d3ab9e] text-white text-center py-2 rounded-xl hover:bg-[#BD8F80] transition">Register</a>
                        </>
                    ) : (
                        <>
                            <a href="/dashboard" className="block text-[#BD8F80] font-medium">Dashboard</a>
                            <a href="/orders" className="block text-[#BD8F80] font-medium">Orders</a>
                            <a href="/profile" className="block text-[#BD8F80] font-medium">Profile</a>

                            <button
                                onClick={handleLogout}
                                className="w-full bg-[#d3ab9e] text-white py-2 rounded-xl hover:bg-[#BD8F80] transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;