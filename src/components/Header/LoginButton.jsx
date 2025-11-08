import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

function LoginButton(props) {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Button onClick={handleLogin} className="h-8 font-light" {...props}>
      Login
    </Button>
  );
}

export default LoginButton;
