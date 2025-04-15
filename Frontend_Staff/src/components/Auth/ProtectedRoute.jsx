import { useAuthStore } from "./authStore";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading, hasRole, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !loading && !isCheckingAuth) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  if ( !hasRole(requiredRole) && !loading && user?.role) { 
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};
