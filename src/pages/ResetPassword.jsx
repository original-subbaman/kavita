import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";
import LoginWrapper from "../components/Login_Signup/LoginWrapper";
import ResponseSnackbar from "../components/ResponseSnackbar";
import Input from "../components/ui/Input";
import supabase from "../supabase_client/create_client";
import { Button } from "../components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import PasswordTextField from "../components/Login_Signup/PasswordTextField";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const newPassword = watch("new_password");

  const onSubmit = async (values) => {
    const { new_password, confirm_password } = values;
    setLoading(true);
    try {
      if (new_password !== confirm_password) {
        throw new Error("New password and confirm password does not match!");
      }

      const { data, error } = await supabase.auth.updateUser({
        password: new_password,
      });

      if (error) {
        throw new Error("Error updating password. Try again later.");
      } else {
        setResponse({
          type: "success",
          message: "Password updated successfully. Redirecting...",
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

  function handleResponseClose() {
    if (response?.type === "success") {
      navigate("/login", { replace: true });
    }

    setResponse(null);
  }

  return (
    <LoginWrapper title={"Reset Password"}>
      {response && (
        <ResponseSnackbar
          open
          onClose={handleResponseClose}
          severity={response?.type}
          message={response?.message}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {/* New Password Input */}
        <PasswordTextField
          name="new_password"
          label="Enter New Password"
          placeholder="Enter New Password"
          register={register}
          error={errors.new_password ? errors.new_password.message : ""}
        />

        {/* Confirm Password Input */}
        <PasswordTextField
          name="confirm_password"
          label="Enter Confirm Password"
          placeholder="Enter Confirm Password"
          register={register}
          error={errors.confirm_password ? errors.confirm_password.message : ""}
          validationRules={{
            validate: (value) =>
              value === newPassword || "*Password does not match",
          }}
        />

        <Button
          loading={loading}
          type={"submit"}
          className="w-full"
          mt={"3"}
          disabled={
            loading ||
            !!errors.new_password ||
            !!errors.confirm_password ||
            !newPassword ||
            !watch("confirm_password") ||
            newPassword !== watch("confirm_password")
          }
        >
          Reset Password
        </Button>
      </form>
    </LoginWrapper>
  );
};

export default ResetPassword;
