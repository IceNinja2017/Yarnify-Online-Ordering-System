import { motion } from "framer-motion"
import FloatingShape from "./components/FloatingShape.jsx"
import { Route, Routes } from "react-router-dom"
import RegistrationPage from "./pages/RegistrationPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute inset-0 scale-110"
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
      
      <FloatingShape color="bg-[#fefeff]" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-[#fffbff]" size="w-48 h-48" top="70%" left="80%" delay={5}/>
      <FloatingShape color="bg-[#f5eae8]" size="w-32 h-32" top="40%" left="-10%" delay={2}/>

      <Routes>
        <Route path="/" element={<p>Home</p>}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegistrationPage />}/>
      </Routes>
      
    </div>
  )
}

export default App
