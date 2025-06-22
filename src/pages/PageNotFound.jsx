import { useNavigate } from "react-router-dom";
import RootWrapper from "../components/RootWrapper";
const NavigateButton = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-slate-300 hover:bg-slate-400 transition-colors duration-300 p-1 px-6 rounded-lg text-dark font-bold"
    >
      {title}
    </button>
  );
};
const PageNotFound = () => {
  const navigate = useNavigate();
  const navigateToHome = () => navigate("/");
  const navigateToLogin = () => navigate("/login");
  const navigateToRegister = () => navigate("/signup");
  return (
    <div className="w-full font-primary min-h-screen bg-dark-light">
      <div className="w-full h-[100vh] font-mono flex flex-col text-white items-center justify-center">
        <p className="text-8xl font-mono text-gray-400">404</p>
        <p className="text-2xl font-mono font-semibold mb-4">
          Oops! We couldn't find that page.
        </p>
        <p className="text-xl font-light">Maybe try the following page:</p>
        <div className="flex gap-4 mt-4">
          <NavigateButton title={"Home"} onClick={navigateToHome} />
          <NavigateButton title={"Login"} onClick={navigateToLogin} />
          <NavigateButton title={"Register"} onClick={navigateToRegister} />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
