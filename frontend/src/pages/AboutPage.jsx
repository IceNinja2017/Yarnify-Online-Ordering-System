import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#fffbff] text-[#BD8F80] relative z-10 px-6 md:px-20 py-12">
      {/* Hero / Intro */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-[#d3ab9e]">
          About Yarnify
        </h1>
        <p className="text-lg text-[#BD8F80] leading-relaxed">
          Yarnify is your cozy corner for all things handmade. From premium yarns to crochet tools and craft materials, 
          we provide everything you need to bring your creativity to life.
        </p>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="bg-[#d3ab9e] border border-[#A77262] rounded-2xl p-8 shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-[#fffbff]">Our Story</h2>
          <p className="text-[#fffbff] leading-relaxed">
            Yarnify started as a small passion project to connect crafters with high-quality yarns and supplies. 
            Today, we’ve grown into a thriving community that inspires creativity and celebrates handmade craftsmanship.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-5xl mx-auto mb-16 grid md:grid-cols-2 gap-6">
        <div className="bg-[#d3ab9e] border border-[#A77262] rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl font-bold mb-3 text-[#fffbff]">Mission</h3>
          <p className="text-[#fffbff] leading-relaxed">
            To provide high-quality yarns, tools, and patterns that empower creators to bring their ideas to life.
          </p>
        </div>
        <div className="bg-[#d3ab9e] border border-[#A77262] rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl font-bold mb-3 text-[#fffbff]">Vision</h3>
          <p className="text-[#fffbff] leading-relaxed">
            We envision a world where everyone can craft with ease, explore new techniques, and share their creativity with a supportive community.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto mb-16 text-center">
        <h2 className="text-3xl font-bold mb-8 text-[#A77262]">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#d3ab9e] border border-[#A77262] rounded-2xl p-6 shadow-md text-center">
            <img
              src="/images/team1.jpg"
              alt="Dignos"
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-2 border-[#A77262]"
            />
            <h3 className="text-xl font-bold text-[#fffbff]">John Kenneth D. Dignos</h3>
            <p className="text-[#fffbff]">Founder & CEO</p>
          </div>
          <div className="bg-[#d3ab9e] border border-[#A77262] rounded-2xl p-6 shadow-md text-center">
            <img
              src="/images/team2.jpg"
              alt="Roche"
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-2 border-[#A77262]"
            />
            <h3 className="text-xl font-bold text-[#fffbff]">John Kenneth N. Roche</h3>
            <p className="text-[#fffbff]">Head of Operations</p>
          </div>
          <div className="bg-[#d3ab9e] border border-[#A77262] rounded-2xl p-6 shadow-md text-center">
            <img
              src="/images/team3.jpg"
              alt="Amanio"
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-2 border-[#A77262]"
            />
            <h3 className="text-xl font-bold text-[#fffbff]">Trisha Mae T. Amanio</h3>
            <p className="text-[#fffbff]">Creative Director</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto text-center py-12 bg-[#eac9c1] rounded-2xl shadow-md">
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

export default AboutPage;
