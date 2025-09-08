import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/auth/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, session, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
