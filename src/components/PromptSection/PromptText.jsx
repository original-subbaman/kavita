import React from "react";
import { Strong, Text } from "@radix-ui/themes";
function PromptText(props) {
  return (
    <Text
      align="center"
      size={{ xs: "4", md: "8" }}
      className="text-bold text-green-700"
    >
      <Strong>The quick brown fox jumps over the lazy dog...</Strong>
    </Text>
  );
}

export default PromptText;
