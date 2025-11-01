import { motion } from "framer-motion";
import Input from "../components/Input";
import { Mail, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
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
                        border border-[#d3ab9e]/20 m-10"
        >
            <div className="p-8">
                <h2
                    className="text-3xl font-bold mb-6 text-center 
                                bg-linear-to-r from-[#A77262] via-[#BD8F80] to-[#D3AB9E] 
                                text-transparent bg-clip-text"
                >
                    Login to Account
                </h2>

                <form onSubmit={handleLogin}>
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

                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-linear-to-r from-[#ebbdae] to-[#D3AB9E] text-white 
                        font-bold rounded-lg shadow-lg hover:from-[#A77262]
                        hover:to-[#795d54] focus:outline-none focus:ring-2 focus:ring-[#A77262] focus:ring-offset-2
                        focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'	
                    >
                        Login
                    </motion.button>
                </form>
            </div>
            <div className='px-8 py-4 bg-[#d4a394] bg-opacity-50 flex justify-center'>
                <p className='text-sm text-[#f5eae8]'>
                    Don't have an account?{" "}
                    <Link to={"/register"} className='text-[#aa6049] hover:underline'>
                        Register now
                    </Link>
                </p>
            </div>
        </motion.div>
    );
}

export default LoginPage