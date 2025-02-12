import React from "react";
import RootWrapper from "../components/RootWrapper";
import { Button, Container, Text } from "@radix-ui/themes";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
function LoginRedirect(props) {
  const navigate = useNavigate();
  return (
    <RootWrapper showHeader={false}>
      <div className="h-screen font-mono flex flex-col text-white items-center justify-center">
        <div className="flex flex-col items-center gap-2 w-full max-w-md">
          <Send size={48} strokeWidth={1.75} />
          <Text className="text-white">
            Thank you for signing up! A verification link has been sent to your
            email address. Please check your inbox and follow the link to verify
            your account. If you don't see the email, check your spam folder or
            try resending it.
          </Text>
          <Button
            className="self-start"
            onClick={() => navigate("/login", { replace: true })}
          >
            Go To Login
          </Button>
        </div>
      </div>
    </RootWrapper>
  );
}

export default LoginRedirect;
