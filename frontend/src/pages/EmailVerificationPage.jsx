import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

const EmailVerificationPage = () => {
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const navigate = useNavigate();
	const isLoading = false;

	const handleChange = (index, value) => {
		const newCode = [...code];

		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex]?.focus();
		} else {
			newCode[index] = value;
			setCode(newCode);
			if (value && index < 5) {
				inputRefs.current[index + 1]?.focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/verify-email",
                { code: verificationCode },
                { withCredentials: true }
            );

            toast.success(response.data?.message || "Email verified successfully!");
            console.log("✅ Response:", response.data);
            navigate("/");
        } 
        catch (error) {
            console.log("❌ Error:", error.response?.data || error);
            const msg = error.response?.data?.message || "Verification failed";
            toast.error(msg);
        }
    };

	useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            (async () => {
                await handleSubmit({ preventDefault: () => {} });
            })();
        }
    }, [code]);

	return (
		<div className="max-w-md w-full bg-[#ebd8d0]/80 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden p-8">
			<motion.div
				initial={{ opacity: 0, y: -40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<h2 className="text-3xl font-bold mb-4 text-center text-[#BD8F80]">
					Verify Your Email
				</h2>
				<p className="text-center text-[#916556] mb-6">
					Enter the 6-digit code sent to your email address.
				</p>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="flex justify-between">
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type="text"
								maxLength="1"
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className="w-12 h-12 text-center text-2xl font-bold text-[#BD8F80] bg-[#fffbff] border-2 border-[#eac9c1] rounded-xl focus:border-[#d3ab9e] focus:outline-none transition-colors"
							/>
						))}
					</div>

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type="submit"
						disabled={isLoading || code.some((digit) => !digit)}
						className="w-full bg-[#d3ab9e] text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-[#BD8F80] transition disabled:opacity-50"
					>
						{isLoading ? "Verifying..." : "Verify Email"}
					</motion.button>
				</form>
			</motion.div>
		</div>
	);
};

export default EmailVerificationPage;
