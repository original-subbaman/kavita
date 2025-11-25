import {
  EnvelopeClosedIcon,
  Pencil1Icon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Checkbox, Dialog, Flex, Text } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUpWithEmail } from "../api/auth.api";
import { isUserNameAvailable } from "../api/user.api";
import CustomTextField from "../components/CustomTextField";
import LoadingButton from "../components/LoadingButton";
import LoginWrapper from "../components/Login_Signup/LoginWrapper";
import PasswordTextField from "../components/Login_Signup/PasswordTextField";
import TermsAndConditions from "../components/Login_Signup/TermsAndConditions";
import { TextFieldProps } from "../components/Login_Signup/TextFieldProps";
import ResponseSnackbar from "../components/ResponseSnackbar";

const REQUIRED_NAME_ERROR = "Name is required";
const REQUIRED_EMAIL_ERROR = "Email is required";
const REQUIRED_ADDRESS_ERROR = "Address is required";
const REQUIRED_USER_NAME_ERROR = "User name is required";

const Signup = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(false);
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
        user_name
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
    <LoginWrapper title={"Signup"}>
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
            <CustomTextField
              control={control}
              name={"name"}
              placeholder="Enter Full Name"
              inputVariant={TextFieldProps.inputVariant}
              size={TextFieldProps.size}
              startIcon={<PersonIcon />}
              rules={{ required: REQUIRED_NAME_ERROR }}
              error={errors?.name?.message}
            />
            <CustomTextField
              control={control}
              name={"user_name"}
              placeholder="Enter User Name"
              inputVariant={TextFieldProps.inputVariant}
              size={TextFieldProps.size}
              startIcon={<Pencil1Icon />}
              rules={{
                required: REQUIRED_USER_NAME_ERROR,
                validate: async (value) => {
                  const available = await isUserNameAvailable({
                    username: value,
                  });
                  return available || "Username is already taken";
                },
              }}
              error={errors?.user_name?.message}
            />
            <CustomTextField
              control={control}
              name={"email"}
              placeholder="Enter Email"
              type={"email"}
              inputVariant={TextFieldProps.inputVariant}
              size={TextFieldProps.size}
              startIcon={<EnvelopeClosedIcon />}
              rules={{ required: REQUIRED_EMAIL_ERROR }}
              error={errors?.email?.message}
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
            name={"password"}
            control={control}
            error={errors?.password?.message}
          />
          {/* Terms and Conditions */}
          <Dialog.Root>
            <TermsAndConditions />
            <Dialog.Trigger>
              <span className="text-sm text-center cursor-pointer underline text-blue-500">
                Read Terms and Conditions
              </span>
            </Dialog.Trigger>
          </Dialog.Root>
          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox checked={checked} onCheckedChange={setChecked} />
              Agree to Terms and Conditions
            </Flex>
          </Text>
          <LoadingButton
            loading={loading}
            type={"submit"}
            className="w-full"
            disabled={!checked || disabledSubmit}
            size={"3"}
            my={"3"}
          >
            Sign Up
          </LoadingButton>
          <Text as="p" align={"center"}>
            Already have an account?{" "}
            <Text
              as="span"
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login here
            </Text>
          </Text>
        </Flex>
      </form>
    </LoginWrapper>
  );
};

export default Signup;
