import CustomTextField from "../CustomTextField";
import { IconButton } from "@radix-ui/themes";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { TextFieldProps } from "./TextFieldProps";
const PasswordTextField = ({ isVisible, togglePasswordVisibility }) => {
  return (
    <CustomTextField
      placeholder="Enter Password"
      inputVariant={TextFieldProps.inputVariant}
      size={TextFieldProps.size}
      type={isVisible ? "text" : "password"}
      startIcon={<DotsHorizontalIcon />}
      endIcon={
        isVisible ? (
          <IconButton
            onClick={togglePasswordVisibility}
            variant="ghost"
            size={"3"}
          >
            <EyeClosedIcon height={"16"} width={"16"} />
          </IconButton>
        ) : (
          <IconButton
            onClick={togglePasswordVisibility}
            variant="ghost"
            size={"3"}
            className="p-2"
          >
            <EyeOpenIcon height={"16"} width={"16"} />
          </IconButton>
        )
      }
    />
  );
};

export default PasswordTextField;
