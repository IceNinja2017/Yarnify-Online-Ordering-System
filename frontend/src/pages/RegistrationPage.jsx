import { motion } from "framer-motion";
import Input from "../components/Input";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { User, Mail, LockKeyhole, MapPin, Home, Globe, Building2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postal, setPostal] = useState('');
    const [country, setCountry] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate()

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (confirmPass !== password) {
            setPasswordError("Passwords do not match!");
            setPassword('')
            setConfirmPass('')
            return;
        }

        setPasswordError('');

        const data = {
            username: name,
            email: email,
            password: password,
            address: {
                street: street,
                city: city,
                state: state,
                postalCode: postal,
                country: country,
            },
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_AUTH_SERVICE_URL}/api/auth/register`, data, {
                withCredentials: true
            });
            console.log("Registration success:", response.data);
            navigate("/verify-email");

        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Login failed");
        }

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
                        border border-[#d3ab9e]/20 m-10"
        >
            <div className="p-8">
                <h2
                    className="text-3xl font-bold mb-6 text-center 
                                bg-linear-to-r from-[#A77262] via-[#BD8F80] to-[#D3AB9E] 
                                text-transparent bg-clip-text"
                >
                    Create Account
                </h2>

                <form onSubmit={handleRegistration}>
                    {/* Basic Info */}
                    <h3 className="text-lg font-semibold text-[#A77262] mb-2 mt-6">Basic Info</h3>
                    <Input 
                        icon={User} 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />

                    <Input 
                        icon={Mail} 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <Input 
                        icon={LockKeyhole} 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <Input 
                        icon={LockKeyhole} 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Confirm Password" 
                        value={confirmPass} 
                        onChange={(e) => setConfirmPass(e.target.value)}
                        required 
                    />

                    {passwordError && (
                        <p className="text-red-600 text-sm mt-1 font-medium text-center">
                            {passwordError}
                        </p>
                    )}

                    {/* Password Strength meter*/}
                    <PasswordStrengthMeter password={password}/>


                    {/* Address Info */}
                    <h3 className="text-lg font-semibold text-[#A77262] mb-2 mt-6">Address</h3>
                    <Input 
                        icon={Home} 
                        type="text" 
                        name="street" 
                        placeholder="Street"
                        value={street} 
                        onChange={(e) => setStreet(e.target.value)}
                        required 
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <Input 
                            icon={Building2} 
                            type="text" 
                            name="city" 
                            placeholder="City" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)}
                            required 
                        />
                        <Input 
                            icon={MapPin} 
                            type="text" 
                            name="state" 
                            placeholder="State" 
                            value={state} 
                            onChange={(e) => setState(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Input 
                            icon={MapPin} 
                            type="text" 
                            name="postalCode" 
                            placeholder="Postal Code"
                            value={postal} 
                            onChange={(e) => setPostal(e.target.value)}
                            required 
                        />
                        <Input 
                            icon={Globe} 
                            type="text" 
                            name="country" 
                            placeholder="Country" 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)}
                            required 
                        />
                    </div>

                    <motion.button
						className='mt-5 w-full py-3 px-4 bg-linear-to-r from-[#ebbdae] to-[#D3AB9E] text-white 
						font-bold rounded-lg shadow-lg hover:from-[#A77262]
						hover:to-[#795d54] focus:outline-none focus:ring-2 focus:ring-[#A77262] focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'	
					>
						Register
					</motion.button>
                </form>
            </div>
            <div className='px-8 py-4 bg-[#d4a394] bg-opacity-50 flex justify-center'>
				<p className='text-sm text-[#f5eae8]'>
					Already have an account?{" "}
					<Link to={"/login"} className='text-[#aa6049] hover:underline'>
						Login
					</Link>
				</p>
			</div>
        </motion.div>
    );
};

export default RegistrationPage;