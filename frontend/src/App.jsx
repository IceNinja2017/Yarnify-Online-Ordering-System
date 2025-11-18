import { motion } from "framer-motion"
import FloatingShape from "./components/FloatingShape.jsx"
import { Route, Routes } from "react-router-dom"
import RegistrationPage from "./pages/RegistrationPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import Footer from "./components/Footer.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import PaymentReturnPage from "./pages/PaymentReturnPage.jsx"
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx"
import { Toaster } from "react-hot-toast"
import ShopPage from "./pages/ShopPage.jsx"
import OrdersPage from "./pages/OrdersPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import PaymentCancelPage from "./pages/PaymentCancelPage.jsx"
import AboutPage from "./pages/AboutPage.jsx"
import ContactPage from "./pages/ContactPage.jsx"
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx"
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx"

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background animation (behind everything) */}
      <motion.div
        className="absolute inset-0 scale-110 z-0"
        style={{
          background: "linear-gradient(135deg, #d3ab9e, #eac9c1, #ebd8d0, #fffbff)",
          backgroundSize: "300% 300%",
          filter: "blur(40px)",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Floating shapes */}
      <FloatingShape
        color="bg-[#fefeff]"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-[#fffbff]"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-[#f5eae8]"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        {/* Navbar should be above background */}
        <Navbar />

        {/* Page content */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/payment/return" element={<PaymentReturnPage />} />
            <Route path="/payment/cancel" element={<PaymentCancelPage />} />
            <Route path="/shop" element={<ShopPage />}/>
            <Route path="/orders" element={<OrdersPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="/about" element={<AboutPage />}/>
            <Route path="/contact" element={<ContactPage />}/>
            <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
            <Route path="/reset-password/:token" element={<ResetPasswordPage />}/>
            <Route path="/item/:id" element={<ContactPage/>}/>
          </Routes>
        </div>

        <div className="relative z-10">
          <Footer />
        </div>
      </AuthProvider>
    </div>
  );
}

export default App
