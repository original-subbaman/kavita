import CustomTextField from "../CustomTextField";
import { IconButton } from "@radix-ui/themes";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { TextFieldProps } from "./TextFieldProps";
import { useState } from "react";
import { PasswordRules } from "../../utils/Constants";
const PasswordTextField = ({ name, control, error }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  return (
    <CustomTextField
      name={name}
      control={control}
      placeholder="Enter Password"
      inputVariant={TextFieldProps.inputVariant}
      size={TextFieldProps.size}
      type={isPasswordVisible ? "text" : "password"}
      rules={PasswordRules}
      error={error}
      startIcon={<DotsHorizontalIcon />}
      endIcon={
        isPasswordVisible ? (
          <IconButton
            onClick={togglePasswordVisibility}
            variant="ghost"
            type="button"
            size={"3"}
          >
            <EyeOpenIcon height={"16"} width={"16"} />
          </IconButton>
        ) : (
          <IconButton
            onClick={togglePasswordVisibility}
            variant="ghost"
            type="button"
            size={"3"}
            className="p-2"
          >
            <EyeClosedIcon height={"16"} width={"16"} />
          </IconButton>
        )
      }
    />
  );
};

export default PasswordTextField;
