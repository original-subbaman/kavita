import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../components/CustomTextField";
import LoginWrapper from "../components/Login_Signup/LoginWrapper";
import PasswordTextField from "../components/Login_Signup/PasswordTextField";
import { TextFieldProps } from "../components/Login_Signup/TextFieldProps";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { handleSubmit, control } = useForm();
  const handleForgotPassword = () => {};

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <LoginWrapper title={"Login"}>
      <Flex direction={"column"} gap={"4"}>
        <CustomTextField
          name={"email"}
          control={control}
          placeholder="Enter Email"
          inputVariant={TextFieldProps.inputVariant}
          size={TextFieldProps.size}
          startIcon={<EnvelopeClosedIcon />}
        />
        <PasswordTextField
          name={"password"}
          control={control}
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
          onClick={() => navigate("/signup", { replace: true })}
        >
          Register here
        </Text>
      </Text>
    </LoginWrapper>
  );
};

export default Login;
