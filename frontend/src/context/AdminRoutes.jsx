import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute() {
  const { isLoggedIn, userRole, loading } = useContext(AuthContext);

  if (loading) {
    return null; // or a loading animation
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}