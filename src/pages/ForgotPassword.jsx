import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Box, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import LoginWrapper from "../components/Login_Signup/LoginWrapper";
import ResponseSnackbar from "../components/ResponseSnackbar";
import Input from "../components/ui/Input";
import useResetPasswordMail from "../hooks/auth/useResetPasswordMail";

const ForgotPassword = () => {
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate: sendResetMail, isPending } = useResetPasswordMail({
    onSuccess: () => {
      console.log("mail sent successfully");
      setResponse({
        type: "success",
        message: "Email sent successfully. Redirecting...",
      });
    },
    onError: (err) => {
      setResponse({
        type: "error",
        message: "Error sending reset password mail",
      });
    },
  });

  function onSubmit(data) {
    sendResetMail(data);
  }

  function handleCloseResponse() {
    setResponse(null);
    if (response?.type === "success") {
      navigate("/login", { replace: true });
    }
  }
  const emailValue = watch("email", "");
  const isEmailEmpty = !emailValue;

  return (
    <LoginWrapper title={"Forgot Password"} subtitle="">
      {response && (
        <ResponseSnackbar
          open
          onClose={handleCloseResponse}
          severity={response?.type}
          message={response?.message}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4"
      >
        <Text className="font-primary">
          Enter your email address below, and we’ll send you a link to reset
          your password.
        </Text>
        <Box>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <EnvelopeClosedIcon />
            </span>
            <Input
              type="email"
              placeholder="Enter Email"
              className="pl-10"
              {...(register &&
                register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                }))}
              aria-invalid={!!errors?.email}
            />
            {errors?.email?.message && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>
          <Button
            type={"submit"}
            className="w-full mt-2"
            disabled={isPending || isEmailEmpty}
          >
            Send Recovery Email
          </Button>
        </Box>
      </form>
    </LoginWrapper>
  );
};

export default ForgotPassword;
