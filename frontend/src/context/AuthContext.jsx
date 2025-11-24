import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("");

  const fetchMe = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_AUTH_SERVICE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      const user = res.data.user || null;

      setIsLoggedIn(!!res.data.loggedIn && !!user);
      setUserId(user?._id || null);
      setUserRole(user?.role || null);
      setProfileImage(user?.profileImage?.url || "");
    } catch (err) {
      setIsLoggedIn(false);
      setUserId(null);
      setUserRole(null);
      setProfileImage("");
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userId, userRole, loading, fetchMe, profileImage }}
    >
      {children}
    </AuthContext.Provider>
  );
};