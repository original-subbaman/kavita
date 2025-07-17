import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

function LoginButton(props) {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Button size="3" onClick={handleLogin} className="min-w-[100px]">
      Login
    </Button>
  );
}

export default LoginButton;
