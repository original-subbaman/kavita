import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";
import { useEffect } from "react";

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If no user is authenticated, navigate to the login page
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  // If user is authenticated, return the element (the protected route)
  return user ? element : null;
};

export default ProtectedRoute;
