import { Navigate } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";
import { useEffect } from "react";
import Loading from "../components/Loading";

const ProtectedRoute = ({ children }) => {
  const { user, session, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  // If no user is authenticated, navigate to the login page
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, return the element (the protected route)
  return children;
};

export default ProtectedRoute;
