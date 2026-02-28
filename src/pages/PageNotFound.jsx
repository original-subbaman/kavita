import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

const PageNotFound = () => {
  const navigate = useNavigate();
  const navigateToHome = () => navigate("/");
  const navigateToLogin = () => navigate("/login");
  const navigateToRegister = () => navigate("/signup");
  return (
    <div className="w-full font-primary min-h-screen">
      <div className="w-full h-[100vh] font-mono flex flex-col text-white items-center justify-center">
        <p className="text-8xl text-gray-400">404</p>
        <p className="text-2xl text-foreground  mb-4">
          Oops! We couldn't find that page.
        </p>
        <p className="text-xl font-light">Maybe try the following page:</p>
        <div className="flex gap-4 mt-4">
          <Button onClick={navigateToHome}>Home</Button>
          <Button onClick={navigateToLogin}>Login</Button>
          <Button onClick={navigateToRegister}>Register</Button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
