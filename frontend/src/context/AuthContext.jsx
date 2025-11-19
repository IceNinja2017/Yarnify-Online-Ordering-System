import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState();

  // fetchMe function: call this to refresh auth state
  const fetchMe = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
      setIsLoggedIn(res.data.loggedIn);
      setProfileImage(res.data.user.profileImage.url);
      if (res.data.loggedIn && res.data.user) {
        setUserId(res.data.user._id);
        setUserRole(res.data.user.role);
      } else {
        setUserId(null);
        setUserRole(null);
        setProfileImage("");
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUserId(null);
      setUserRole(null);
      setProfileImage("");
    } finally {
      setLoading(false);
    }
  };

  // call it on mount
  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId, userRole, loading, fetchMe, profileImage }}>
      {children}
    </AuthContext.Provider>
  );
};