import React from "react";
import { Flex, Button, Text, Strong } from "@radix-ui/themes";
import { Pencil1Icon } from "@radix-ui/react-icons";

function PromptTextField(props) {
  return (
    <Flex
      direction="column"
      gap="4"
      style={{ minWidth: 800, marginTop: "8px", marginBottom: "8px" }}
    >
      <Text align="center" highContrast={true} size="8" color="grass">
        <Strong>The quick brown fox jumps over the lazy dog...</Strong>
      </Text>
      <Button
        size="3"
        variant="soft"
        radius="large"
        style={{ width: 800, height: "50px" }}
      >
        <Pencil1Icon width="25" height="25" />
        <Text size="6">Free write...</Text>
      </Button>
    </Flex>
  );
}

export default PromptTextField;
