import React from "react";
import { Text } from "@radix-ui/themes";
import { ImHeartBroken } from "react-icons/im";

function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <ImHeartBroken className="text-red-500 w-16 h-16" />
      <Text size={"4"} className="text-red-500">
        {message}
      </Text>
    </div>
  );
}

export default ErrorMessage;
