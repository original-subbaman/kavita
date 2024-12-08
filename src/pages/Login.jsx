import RootWrapper from "../components/RootWrapper";
import {
  Container,
  Card,
  Text,
  Box,
  TextField,
  Flex,
  Button,
  IconButton,
} from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  DotsHorizontalIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import CustomTextField from "../components/CustomTextField";
import { useState } from "react";
import LoginWrapper from "../components/Login_Signup/LoginWrapper";
import { TextFieldProps } from "../components/Login_Signup/TextFieldProps";
import PasswordTextField from "../components/Login_Signup/PasswordTextField";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleForgotPassword = () => {};

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <LoginWrapper title={"Login"}>
      <Flex direction={"column"} gap={"4"}>
        <CustomTextField
          placeholder="Enter Email"
          inputVariant={TextFieldProps.inputVariant}
          size={TextFieldProps.size}
          startIcon={<EnvelopeClosedIcon />}
        />
        <PasswordTextField
          isVisible={passwordVisible}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </Flex>
      <Flex justify={"end"} my={"3"}>
        <Text
          className="text-blue-500 cursor-pointer"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </Text>
      </Flex>
      <Button className="w-full" size={"3"}>
        Login
      </Button>
      <Text as="p" align={"center"} mt={"4"}>
        New to CWS?{" "}
        <Text
          as="span"
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Register here
        </Text>
      </Text>
    </LoginWrapper>
  );
};

export default Login;
