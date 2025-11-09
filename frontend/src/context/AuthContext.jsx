import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check login on mount
        axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
            .then(res => setIsLoggedIn(res.data.loggedIn))
            .catch(() => setIsLoggedIn(false));
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};