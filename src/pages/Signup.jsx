import {
  EnvelopeClosedIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../components/CustomTextField";
import LoginWrapper from "../components/Login_Signup/LoginWrapper";
import PasswordTextField from "../components/Login_Signup/PasswordTextField";
import { TextFieldProps } from "../components/Login_Signup/TextFieldProps";
import CustomSelect from "../components/Select";
import { GenderOptions } from "../utils/Constants";
const REQUIRED_NAME_ERROR = "Name is required";
const REQUIRED_EMAIL_ERROR = "Email is required";
const REQUIRED_ADDRESS_ERROR = "Address is required";

const Signup = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const formRef = useRef(null);

  const [gender, setGender] = useState("Male");

  const onSubmit = (data) => {
    const newUser = { ...data, gender: gender };
    console.log("~ gender ~", newUser);
  };

  return (
    <LoginWrapper title={"Signup"}>
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
          <Button type="submit" className="w-full" size={"3"} my={"3"}>
            Login
          </Button>
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
