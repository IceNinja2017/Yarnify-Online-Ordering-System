import { motion } from "framer-motion";
import Input from "../components/Input";
import { User, Mail, LockKeyhole, MapPin, Home, Globe, Building2 } from "lucide-react";

const RegistrationPage = () => {
  const handleRegistration = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      address: {
        street: formData.get("street"),
        city: formData.get("city"),
        state: formData.get("state"),
        postalCode: formData.get("postalCode"),
        country: formData.get("country"),
      },
    };

    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full 
                 bg-[#f5eae8]/80 backdrop-blur-2xl 
                 rounded-2xl shadow-2xl overflow-hidden 
                 border border-[#d3ab9e]/20"
    >
      <div className="p-8">
        <h2
          className="text-3xl font-bold mb-6 text-center 
                     bg-gradient-to-r from-[#A77262] via-[#BD8F80] to-[#D3AB9E] 
                     text-transparent bg-clip-text"
        >
          Create Account
        </h2>

        <form onSubmit={handleRegistration}>
          {/* Basic Info */}
          <Input icon={User} type="text" name="username" placeholder="Username" required />
          <Input icon={Mail} type="email" name="email" placeholder="Email" required />
          <Input icon={LockKeyhole} type="password" name="password" placeholder="Password" required />
          <Input icon={LockKeyhole} type="password" name="confirmPassword" placeholder="Confirm Password" required />

          {/* Address Info */}
          <Input icon={Home} type="text" name="street" placeholder="Street" required />
          <Input icon={Building2} type="text" name="city" placeholder="City" required />
          <Input icon={MapPin} type="text" name="state" placeholder="State" required />
          <Input icon={MapPin} type="text" name="postalCode" placeholder="Postal Code" required />
          <Input icon={Globe} type="text" name="country" placeholder="Country" required />

          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-lg 
                       bg-gradient-to-r from-[#ebbdae] via-[#BD8F80] to-[#D3AB9E] 
                       text-gray-900 font-semibold 
                       hover:opacity-90 transition duration-200 shadow-lg"
          >
            Register
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default RegistrationPage;