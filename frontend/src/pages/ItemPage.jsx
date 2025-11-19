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
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await axios.get(`http://localhost:5002/api/products/get-product/${id}`);
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
        try {
            await axios.post("http://localhost:5001/api/payment/add-to-cart", {
                productId: id,
                quantity: 1
            });
            toast.success("Added to cart");
        } catch (err) {
            toast.error("Failed to add to cart");
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
                                className="rounded-2xl h-100 object-cover mx-auto cursor-pointer"
                                onClick={() => { setPreviewIndex(index); setPreviewOpen(true); }}
                            />
                        </div>
                    ))}
                </Carousel>

                {previewOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                        <div className="relative w-[90%] max-w-3xl">
                            <button className="absolute top-2 right-2 text-white text-2xl" onClick={() => setPreviewOpen(false)}>×</button>
                            <Carousel selectedItem={previewIndex} showThumbs={false} infiniteLoop>
                                {item.image.map((img, idx) => (
                                    <div key={idx}>
                                        <img src={img.url} className="max-w-full max-h-[80vh] rounded-2xl mx-auto" />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                )}

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