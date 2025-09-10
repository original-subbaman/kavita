import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoginWrapper from "../components/Login_Signup/LoginWrapper";
import PasswordTextField from "../components/Login_Signup/PasswordTextField";
import supabase from "../supabase_client/create_client";
import LoadingButton from "../components/LoadingButton";
import ResponseSnackbar from "../components/ResponseSnackbar";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("new_password");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    setAccessToken(token);
  }, []);

  const onSubmit = async (values) => {
    const { new_password, confirm_password } = values;
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("Missing access token");
      }

      if (new_password !== confirm_password) {
        throw new Error("New password and confirm password does not match!");
      }

      const { data, error } = await supabase.auth.updateUser(
        { password: new_password },
        { accessToken }
      );

      if (error) {
        throw new Error("Error updating password. Try again later.");
      } else {
        setResponse({
          type: "success",
          message: "Password updated successfully.",
        });
      }
    } catch (e) {
      const errMsg = e?.message;
      setResponse({
        type: "error",
        message: errMsg || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper title={"Reset Password"}>
      {response && (
        <ResponseSnackbar
          open
          onClose={() => setResponse(null)}
          severity={response?.type}
          message={response?.message}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <PasswordTextField
          name={"new_password"}
          control={control}
          label="Enter New Password"
          rules={{ required: "Please enter your new password" }}
          error={errors?.new_password?.message}
        />
        <PasswordTextField
          name={"confirm_password"}
          control={control}
          label="Enter Confirm Password"
          rules={{
            required: "Please re-enter your password",
            validate: (value) =>
              value === newPassword || "*Password does not match",
          }}
          error={errors?.confirm_password?.message}
        />
        <LoadingButton
          loading={loading}
          type={"submit"}
          className="w-full"
          size={"3"}
          my={"3"}
        >
          Reset Password
        </LoadingButton>
      </form>
    </LoginWrapper>
  );
};

export default ResetPassword;
