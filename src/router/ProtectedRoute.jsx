import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, session, loading } = useAuth();
  const navigate = useNavigate();

  // If no user is authenticated, navigate to the login page
  useEffect(() => {
    if (!loading && !session) {
      navigate("/login", { replace: true });
    }
  }, [loading, session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is authenticated, return the element (the protected route)
  return children;
};

export default ProtectedRoute;
