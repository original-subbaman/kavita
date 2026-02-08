import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import DecorativeLeftPanel from "../components/Login_Signup/DecorativeLeftPanel";
import ResponseSnackbar from "../components/ResponseSnackbar";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import useAuth from "../hooks/auth/useAuth";
import CircularLoadingSvg from "../components/Common/CircularLoadingSvg";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex">
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
      <DecorativeLeftPanel />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-3">
              <span className="font-display text-2xl font-semibold text-primary">
                कविता
              </span>
            </Link>
          </div>

          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Continue your poetry journey
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 bg-card border-border"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-card border-border"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                {errors.password && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

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
        </div>
      </div>
    </div>
  );
};

export default Login;
