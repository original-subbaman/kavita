import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Box, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomTextField from "../components/CustomTextField";
import LoadingButton from "../components/LoadingButton";
import LoginWrapper from "../components/Login_Signup/LoginWrapper";
import { TextFieldProps } from "../components/Login_Signup/TextFieldProps";
import ResponseSnackbar from "../components/ResponseSnackbar";
import useResetPasswordMail from "../hooks/auth/useResetPasswordMail";

const ForgotPassword = () => {
  const [response, setResponse] = useState(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { mutate: sendResetMail, isPending } = useResetPasswordMail({
    onSuccess: () => {
      console.log("mail sent successfully");
    },
    onError: (err) => {
      console.log("🚀 ~ ForgotPassword ~ err:", err);
      setResponse({
        type: "error",
        message: "Error sending reset password mail",
      });
    },
  });

  function onSubmit(data) {
    sendResetMail(data);
  }

  return (
    <LoginWrapper title={"Forgot Password"}>
      {response && (
        <ResponseSnackbar
          open
          onClose={() => setResponse(null)}
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
          <LoadingButton
            loading={isPending}
            type={"submit"}
            className="w-full"
            size={"3"}
            my={"3"}
          >
            Send Recovery Email
          </LoadingButton>
        </Box>
      </form>
    </LoginWrapper>
  );
};

export default ForgotPassword;
