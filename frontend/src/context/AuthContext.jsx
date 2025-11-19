import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null); // <-- added

  useEffect(() => {
    // Check login on mount
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(res.data.loggedIn);

        if (res.data.loggedIn && res.data.user) {
          setUserId(res.data.user._id);
          setUserRole(res.data.user.role); // <-- save role
        } else {
          setUserId(null);
          setUserRole(null);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUserId(null);
        setUserRole(null);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};