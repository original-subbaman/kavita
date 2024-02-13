import React from "react";
import {
  Flex,
  Button,
  Text,
  Strong,
  AlertDialog,
  TextArea,
} from "@radix-ui/themes";
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
      <AlertDialog.Trigger>
        <Button
          size="3"
          variant="soft"
          radius="large"
          style={{ width: 800, height: "50px" }}
        >
          <Pencil1Icon width="25" height="25" />
          <Text size="6">Free write...</Text>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content className="w-[250px]">
        <AlertDialog.Title>
          Today's Prompt: Once upon a time...
        </AlertDialog.Title>
        <AlertDialog.Description>
          <TextArea
            size={{
              xs: "1",
              sm: "2",
              md: "3",
            }}
            className="h-[350px] p-2 rounded-md"
            placeholder="Once upon a time..."
          />
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid">Post</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </Flex>
  );
}

export default PromptTextField;
