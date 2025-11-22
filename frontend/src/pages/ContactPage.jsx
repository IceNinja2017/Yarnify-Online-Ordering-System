import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#fffbff] text-[#BD8F80] px-6 md:px-20 py-12 relative z-10">
      {/* Hero / Title */}
      <section className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-[#d3ab9e]">Contact Us</h1>
        <p className="text-lg text-[#BD8F80] leading-relaxed">
          Have questions or want to get in touch? Reach out to us via email or visit us at our address.
        </p>
      </section>

      {/* Contact Info */}
      <section className="max-w-2xl mx-auto bg-[#fffbffe6] border border-[#d3ab9e] rounded-2xl p-8 shadow-md text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#A77262]">Get in Touch</h2>
        
        <p className="text-[#BD8F80] mb-4">
          <span className="font-semibold">Direct Email:</span> johnkenneth.dignos17@gmail.com
        </p>
        <p className="text-[#BD8F80] mb-4">
          <span className="font-semibold">Support Email:</span> support@yarnify.com
        </p>
        <p className="text-[#BD8F80]">
          <span className="font-semibold">Address:</span> Lilia Avenue, Cogon, Ormoc City, Leyte, Philippines 
        </p>
      </section>
    </div>
  );
};

export default ContactPage;
