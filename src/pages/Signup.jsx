import { Button, Flex, Text } from "@radix-ui/themes";
import LoginWrapper from "../components/Login_Signup/LoginWrapper";
import { TextFieldProps } from "../components/Login_Signup/TextFieldProps";
import CustomTextField from "../components/CustomTextField";
import {
  PersonIcon,
  EnvelopeClosedIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import CustomSelect from "../components/Select";
import { GenderOptions } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PasswordTextField from "../components/Login_Signup/PasswordTextField";
const Signup = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <LoginWrapper title={"Signup"}>
      <Flex direction={"column"} gap={"4"}>
        <CustomTextField
          placeholder="Enter Full Name"
          inputVariant={TextFieldProps.inputVariant}
          size={TextFieldProps.size}
          startIcon={<PersonIcon />}
        />
        <CustomTextField
          placeholder="Enter Email"
          inputVariant={TextFieldProps.inputVariant}
          size={TextFieldProps.size}
          startIcon={<EnvelopeClosedIcon />}
        />
      </Flex>
      <Flex gap={"4"} align={"stretch"}>
        <CustomTextField
          rootClass={"flex-1"}
          placeholder="From (city, state, country)"
          inputVariant={TextFieldProps.inputVariant}
          size={TextFieldProps.size}
          startIcon={<HomeIcon />}
        />
        <CustomSelect
          size={"3"}
          triggerClass={"min-w-[100px]"}
          values={GenderOptions}
          defaultValue={"Male"}
        />
      </Flex>
      <PasswordTextField
        isVisible={isPasswordVisible}
        togglePasswordVisibility={togglePasswordVisibility}
      />
      <Button className="w-full" size={"3"} my={"3"}>
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
    </LoginWrapper>
  );
};

export default Signup;
