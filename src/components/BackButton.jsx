import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, IconButton } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

const BackButton = ({ size = "2" }) => {
  const navigate = useNavigate();
  return (
    <IconButton
      onClick={() => navigate(-1)}
      size={size}
      className="rounded-full bg-orange-500 hover:bg-orange-600 text-white"
    >
      <ArrowLeftIcon />
    </IconButton>
  );
};

export default BackButton;
