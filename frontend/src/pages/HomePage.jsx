import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Scissors, Palette, Circle } from "lucide-react";

// Optional custom yarn icon if you prefer it over Circle
const YarnIcon = ({ className, size = 40 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    width={size}
    height={size}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M4 12c4-4 12-4 16 0M4 12c4 4 12 4 16 0M9 3a9 9 0 0 1 6 18" />
  </svg>
);

const HomePage = () => {
  return (
    <div className="relative z-10 text-[#BD8F80]">
      {/* Hero Section */}
      <section
        className="relative flex flex-col md:flex-row items-center justify-between px-8 py-16 md:px-20 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/de3p2nwrz/image/upload/v1762654088/Yarnify-Interior-2048x1363-207886664_c4pn1g.jpg')",
        }}
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

        <div className="relative md:w-1/2 bg-[#fffbffe6] p-8 rounded-2xl shadow-md">
          <h1 className="text-4xl md:text-5xl font-bold text-[#d3ab9e]">
            Bring Your Creativity to Life
          </h1>
          <p className="text-lg text-[#BD8F80] leading-relaxed mt-4">
            Discover premium yarns, crochet tools, and craft essentials to make your ideas a reality. Yarnify is your cozy corner for all things handmade.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-6 bg-[#d3ab9e] text-white px-6 py-3 rounded-xl hover:bg-[#BD8F80] transition"
          >
            Shop Now
          </Link>
        </div>

        <motion.div
          className="relative mt-10 md:mt-0 md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://res.cloudinary.com/de3p2nwrz/image/upload/v1762654120/craft-colorful-knit-yarn-wool-material-613720-pxhere.com_sx88lk.jpg"
            alt="Yarn and Crochet Supplies"
            className="rounded-2xl shadow-lg max-h-[400px] object-cover"
          />
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-[#ebd8d0] text-center">
        <h2 className="text-3xl font-bold mb-8 text-[#BD8F80]">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-[#fffbff] p-6 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
            <YarnIcon className="mx-auto mb-3 text-[#d3ab9e]" size={40} />
            <p className="font-semibold">Yarn</p>
          </div>
          <div className="bg-[#fffbff] p-6 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
            <Scissors className="mx-auto mb-3 text-[#d3ab9e]" size={40} />
            <p className="font-semibold">Crochet & Knitting Tools</p>
          </div>
          <div className="bg-[#fffbff] p-6 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
            <Palette className="mx-auto mb-3 text-[#d3ab9e]" size={40} />
            <p className="font-semibold">Craft Materials</p>
          </div>
          <div className="bg-[#fffbff] p-6 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
            <ShoppingBag className="mx-auto mb-3 text-[#d3ab9e]" size={40} />
            <p className="font-semibold">Finished Products</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        className="py-16 bg-cover bg-center text-center text-[#BD8F80]"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/de3p2nwrz/image/upload/v1762654045/colorful-yarn_a1x8bi.jpg",
        }}
      >
        <div className="bg-[#fffbffe6] max-w-4xl mx-auto p-10 rounded-2xl shadow-md">
          <h2 className="text-3xl font-bold mb-8 text-[#BD8F80]">Featured Products</h2>
          <p className="text-[#BD8F80]">Coming soon...</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#eac9c1] text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#BD8F80]">
          Join Our Crafting Community
        </h2>
        <p className="text-[#BD8F80] mb-6">
          Sign up for updates, tutorials, and exclusive discounts.
        </p>
        <Link
          to="/register"
          className="bg-[#d3ab9e] text-white px-6 py-3 rounded-xl hover:bg-[#BD8F80] transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default HomePage;