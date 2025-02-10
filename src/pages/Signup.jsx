import {
  EnvelopeClosedIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { PenLine } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUpWithEmail, updateProfileData } from "../api/auth.api";
import { isUserNameAvailable } from "../api/user.api";
import CustomTextField from "../components/CustomTextField";
import LoadingButton from "../components/LoadingButton";
import LoginWrapper from "../components/Login_Signup/LoginWrapper";
import PasswordTextField from "../components/Login_Signup/PasswordTextField";
import { TextFieldProps } from "../components/Login_Signup/TextFieldProps";
import ResponseSnackbar from "../components/ResponseSnackbar";
import CustomSelect from "../components/Select";
import { GenderOptions } from "../utils/Constants";
const REQUIRED_NAME_ERROR = "Name is required";
const REQUIRED_EMAIL_ERROR = "Email is required";
const REQUIRED_ADDRESS_ERROR = "Address is required";
const REQUIRED_USER_NAME_ERROR = "User name is required";

const Signup = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({
    success: false,
    error: false,
    info: false,
    message: "",
  });

  const handleResponseClose = () =>
    setResponse({ success: false, error: false, message: "" });

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();
  const formRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Sign up user
      const { data: authData, error } = await signUpWithEmail(
        data.email,
        data.password,
        data.name
      );

      if (error) {
        setResponse({
          error: true,
          success: false,
          info: false,
          message: error.message,
        });
        return;
      }

      delete data["email"];
      delete data["password"];
      // Update profile data
      const newUser = {
        id: authData.user.id,
        name: data.name,
        userName: data.user_name,
        address: data.address,
        gender,
      };

      const { error: profileError } = await updateProfileData(newUser);

      if (profileError) {
        setResponse({
          error: true,
          success: false,
          info: false,
          message: "Profile update failed. Please try again.",
        });
        return;
      }

      // Success case
      setResponse({
        error: false,
        success: true,
        info: true,
        message: "Please check your email for verification link",
      });
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      setResponse({
        error: true,
        success: false,
        info: false,
        message: "Cannot sign up user at the moment",
      });
    } finally {
      setLoading(false);
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
              startIcon={<PenLine />}
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
          <Flex gap={"4"} align={"stretch"}>
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
          </Flex>
          <PasswordTextField
            name={"password"}
            control={control}
            error={errors?.password?.message}
          />
          <LoadingButton
            loading={loading}
            type={"submit"}
            className="w-full"
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
