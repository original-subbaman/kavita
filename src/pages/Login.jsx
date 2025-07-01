import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../components/CustomTextField";
import LoginWrapper from "../components/Login_Signup/LoginWrapper";
import PasswordTextField from "../components/Login_Signup/PasswordTextField";
import { TextFieldProps } from "../components/Login_Signup/TextFieldProps";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/auth/useAuth";
import ResponseSnackbar from "../components/ResponseSnackbar";
import LoadingButton from "../components/LoadingButton";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [response, setResponse] = useState({
    success: false,
    error: false,
    message: "",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { login, loading } = useAuth();

  const handleForgotPassword = () => {};

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleResponseClose = () =>
    setResponse({ success: false, error: false, message: "" });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);

      // If login is successful, navigate to dashboard
      navigate("/");
    } catch (error) {
      let errorMessage;
      // Handle specific error cases
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Please confirm your email before logging in";
      } else {
        errorMessage = "An error occurred during login. Please try again.";
      }
      setResponse((prev) => ({
        ...prev,
        error: true,
        message: errorMessage,
      }));
    }
  };

  return (
    <LoginWrapper title={"Login"}>
      {/* Success Snackbar */}
      <ResponseSnackbar
        open={response.success}
        onClose={handleResponseClose}
        message={response.message}
        severity={"success"}
      />
      {/* Error Snackbar */}
      <ResponseSnackbar
        open={response.error}
        onClose={handleResponseClose}
        message={response.message}
        severity={"error"}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction={"column"} gap={"4"}>
          <CustomTextField
            name={"email"}
            control={control}
            placeholder="Enter Email"
            inputVariant={TextFieldProps.inputVariant}
            size={TextFieldProps.size}
            startIcon={<EnvelopeClosedIcon />}
            error={errors?.email?.message}
            rules={{ required: "Please enter your email" }}
          />
          <PasswordTextField
            name={"password"}
            control={control}
            isVisible={passwordVisible}
            rules={{ required: "Please enter your password" }}
            error={errors?.password?.message}
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
        <LoadingButton
          loading={loading}
          type={"submit"}
          className="w-full"
          size={"3"}
          my={"3"}
        >
          Sign In
        </LoadingButton>
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
      </form>
    </LoginWrapper>
  );
};

export default Login;
