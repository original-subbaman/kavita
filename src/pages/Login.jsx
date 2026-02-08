import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CircularLoadingSvg from "../components/Common/CircularLoadingSvg";
import EmailTextField from "../components/Login_Signup/EmailTextField";
import LoginWrapper from "../components/Login_Signup/LoginWrapper";
import PasswordTextField from "../components/Login_Signup/PasswordTextField";
import ResponseSnackbar from "../components/ResponseSnackbar";
import { Button } from "../components/ui/Button";
import useAuth from "../hooks/auth/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({
    success: false,
    error: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();

  const handleForgotPassword = () => navigate("/forgot-password");

  const handleResponseClose = () =>
    setResponse({ success: false, error: false, message: "" });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      setLoading(false);
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      let errorMessage;
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
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
        {/* Email */}
        <EmailTextField register={register} error={errors.email} />
        {/* Password */}
        <PasswordTextField register={register} error={errors.password} />

        {/* Forgot Password */}
        <div className="flex justify-end my-4">
          <button
            type="button"
            className="text-sm text-primary hover:underline"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        </div>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <CircularLoadingSvg />
              Signing In...
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          New to Kavita?{" "}
          <button
            className="text-primary font-medium hover:underline"
            onClick={() => navigate("/signup", { replace: true })}
          >
            Register here
          </button>
        </div>
      </form>
    </LoginWrapper>
  );
};

export default Login;
