import { PersonIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { AtSign } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUpWithEmail } from "../api/auth.api";
import EmailTextField from "../components/Login_Signup/EmailTextField";
import LoginWrapper from "../components/Login_Signup/LoginWrapper";
import PasswordTextField from "../components/Login_Signup/PasswordTextField";
import TermsAndConditions from "../components/Login_Signup/TermsAndConditions";
import ResponseSnackbar from "../components/ResponseSnackbar";
import { Button } from "../components/ui/Button";
import { Checkbox } from "../components/ui/Checkbox";
import { Dialog } from "../components/ui/Dialog";
import Input from "../components/ui/Input";
import { Label } from "../components/ui/Label";

const REQUIRED_NAME_ERROR = "Name is required";
const REQUIRED_EMAIL_ERROR = "Email is required";
const REQUIRED_ADDRESS_ERROR = "Address is required";
const REQUIRED_USER_NAME_ERROR = "User name is required";

const Signup = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [checked, setChecked] = useState(false);
  const [response, setResponse] = useState({
    success: false,
    error: false,
    info: false,
    message: "",
  });

  const handleResponseClose = () => {
    setResponse({ success: false, error: false, message: "" });
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password, name, user_name }) => {
    try {
      setLoading(true);
      setDisabledSubmit(true);

      // Sign up user
      const { session, user } = await signUpWithEmail(
        email,
        password,
        name,
        user_name,
      );

      // Success case
      setResponse({
        error: false,
        success: true,
        info: false,
        message: "Sign up successful! Redirecting to login...",
      });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      setResponse({
        error: true,
        success: false,
        info: false,
        message: error?.message || "Cannot sign up user at the moment",
      });
    } finally {
      setLoading(false);
      setDisabledSubmit(false);
    }
  };

  return (
    <LoginWrapper
      title="Create Your Account"
      subtitle="Start your journey as a poet today"
    >
      {/* Success Snackbar */}
      <ResponseSnackbar
        open={response.success}
        onClose={handleResponseClose}
        message={response.message}
        severity={"success"}
        autoHideDuration={3000}
      />
      {/* Info snackbar */}
      <ResponseSnackbar
        open={response.info}
        onClose={handleResponseClose}
        message={response.message}
        severity={"info"}
        autoHideDuration={5000}
      />
      {/* Error Snackbar */}
      <ResponseSnackbar
        open={response.error}
        onClose={handleResponseClose}
        message={response.message}
        severity={"error"}
      />

      {/* Sign Up form */}
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Flex direction={"column"} gap={"4"}>
          <Flex direction={"column"} gap={"4"}>
            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-foreground">
                Full Name
              </Label>
              <div>
                <div className="relative">
                  <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullname"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 bg-card border-border"
                    {...register("name", {
                      required: REQUIRED_NAME_ERROR,
                    })}
                  />
                </div>
                {errors.name && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">
                Username
              </Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  className="pl-10 bg-card border-border"
                  {...register("user_name", {
                    required: REQUIRED_USER_NAME_ERROR,
                  })}
                />
              </div>
              {errors.user_name && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.user_name.message}
                </span>
              )}
            </div>

            <EmailTextField
              register={register}
              error={errors.email ? errors.email.message : ""}
            />
          </Flex>
          {/* <Flex gap={"4"} align={"stretch"}>
            <CustomTextField
              control={control}
              name={"address"}
              rootClass={"flex-1"}
              placeholder="From (city, state, country)"
              inputVariant={TextFieldProps.inputVariant}
              size={TextFieldProps.size}
              startIcon={<HomeIcon />}
              rules={{ required: REQUIRED_ADDRESS_ERROR }}
              error={errors?.address?.message}
            />
            <CustomSelect
              size={"3"}
              value={gender}
              onValueChange={(value) => setGender(value)}
              triggerClass={""}
              values={GenderOptions}
              defaultValue={"Male"}
            />
          </Flex> */}
          <PasswordTextField
            register={register}
            error={errors.password ? errors.password.message : ""}
          />

          <Text as="label" size="2">
            <Flex gap="2" align="center">
              <Checkbox checked={checked} onCheckedChange={setChecked} />
              <Label
                htmlFor="terms"
                className="text-sm text-muted-foreground font-normal leading-snug cursor-pointer"
              >
                I agree to the{" "}
                <button
                  type="button"
                  className="text-primary hover:underline font-medium"
                  onClick={() => setOpenTerms(true)}
                >
                  Terms & Conditions
                </button>
              </Label>
            </Flex>
          </Text>
          {/* Terms and Conditions */}
          <Dialog open={openTerms} onOpenChange={setOpenTerms}>
            <TermsAndConditions />
          </Dialog>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
            disabled={loading || !checked || disabledSubmit}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <CircularLoadingSvg />
                Registering...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-center  font-medium">
            Already have an account?{" "}
            <span
              className="text-primary hover:underline font-medium"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </Flex>
      </form>
    </LoginWrapper>
  );
};

export default Signup;
