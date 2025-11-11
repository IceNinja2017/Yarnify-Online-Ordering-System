import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#BD8F80] text-[#fffbff] py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo & Tagline */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-[#fffbff]">Yarnify</h1>
          <p className="text-sm mt-1">Your cozy corner for all things handmade.</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm font-medium">
          <a href="/" className="hover:text-[#d3ab9e] transition">Home</a>
          <a href="/shop" className="hover:text-[#d3ab9e] transition">Shop</a>
          <a href="/about" className="hover:text-[#d3ab9e] transition">About</a>
          <a href="/contact" className="hover:text-[#d3ab9e] transition">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#d3ab9e] transition"><Facebook size={20} /></a>
          <a href="#" className="hover:text-[#d3ab9e] transition"><Instagram size={20} /></a>
          <a href="#" className="hover:text-[#d3ab9e] transition"><Twitter size={20} /></a>
          <a href="mailto:info@yarnify.com" className="hover:text-[#d3ab9e] transition"><Mail size={20} /></a>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-8 border-t border-[#d3ab9e]/50 pt-4 text-center text-sm text-[#fffbff]">
        © {new Date().getFullYear()} Yarnify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;