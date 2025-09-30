import useAuth from "../hooks/auth/useAuth";

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <></>;
};

export default AuthGuard;
