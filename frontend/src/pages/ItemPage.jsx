import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ItemPage() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    // Fetch logged user info
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_AUTH_SERVICE_URL}/api/auth/me`, {
                    withCredentials: true,
                });
                setUserId(res.data.user._id);
            } catch (err) {
                console.error("Not logged in or failed to fetch user");
            }
        };
        fetchUser();
    }, []);

    // Fetch item
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_PRODUCT_SERVICE_URL}/api/products/get-product/${id}`);
                setItem(res.data.product);
            } catch (err) {
                toast.error("Failed to load item");
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    const handleAddToCart = async () => {
        if (!userId) return toast.error("Please login to add products to cart");

        try {
            await axios.post(
                `${import.meta.env.VITE_PAYMENT_SERVICE_URL}/api/payment/add-to-cart`,
                {
                    userId,
                    item: {
                        productId: id,
                        quantity: 1,
                    },
                },
                { withCredentials: true }
            );

            toast.success("Added to cart");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add to cart");
        }
    };

    if (loading) return <div className="text-center py-10 text-lg">Loading...</div>;
    if (!item) return <div className="text-center py-10 text-lg">Item not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-6" style={{ backgroundColor: "#fffbff" }}>
            <div className="bg-white p-6 rounded-2xl shadow" style={{ backgroundColor: "#fefeff" }}>
                <Carousel showThumbs={false} infiniteLoop autoPlay>
                    {item.image && item.image.map((img, index) => (
                        <div key={index}>
                            <img
                                src={img.url}
                                alt="item"
                                className="rounded-2xl h-100 object-cover mx-auto"
                            />
                        </div>
                    ))}
                </Carousel>

                <h1 className="text-3xl font-bold mt-6" style={{ color: "#d3ab9e" }}>{item.title}</h1>
                <p className="mt-2 text-lg" style={{ color: "#eac9c1" }}>{item.description}</p>

                <div className="mt-4 flex flex-col gap-1">
                    <span className="text-xl font-semibold" style={{ color: "#d3ab9e" }}>₱{item.price}</span>
                    <span className="text-md" style={{ color: "#ebd8d0" }}>Category: {item.category}</span>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="mt-6 w-full py-3 rounded-xl font-semibold hover:opacity-90"
                    style={{ backgroundColor: "#d3ab9e", color: "#fff" }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
