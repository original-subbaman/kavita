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
import CustomTextField from "../components/TextField";
import { useState } from "react";

const TextFieldProps = {
  size: "3",
  inputVariant: "soft",
};
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleForgotPassword = () => {};

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <RootWrapper showHeader={false}>
      <Flex align={"center"} justify={"center"} className="min-h-screen">
        <Box className="bg-white p-6 min-w-[500px] min-h-[400px] shadow-lg rounded-md">
          <Text size={"6"} className="text-[#30a46c]">
            Login
          </Text>
          <hr className="my-4"></hr>
          <Flex direction={"column"} gap={"4"}>
            <CustomTextField
              placeholder="Enter Email"
              inputVariant={TextFieldProps.inputVariant}
              size={TextFieldProps.size}
              startIcon={<EnvelopeClosedIcon />}
            />
            <CustomTextField
              placeholder="Enter Password"
              inputVariant={TextFieldProps.inputVariant}
              size={TextFieldProps.size}
              type={passwordVisible ? "text" : "password"}
              startIcon={<DotsHorizontalIcon />}
              endIcon={
                passwordVisible ? (
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
            <Text as="span" className="text-blue-500 cursor-pointer">
              Register here
            </Text>
          </Text>
        </Box>
      </Flex>
    </RootWrapper>
  );
};

export default Login;
