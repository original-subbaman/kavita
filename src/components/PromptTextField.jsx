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
    <Flex direction="column" gap="4" className="md:w-[800px] my-8">
      <Text
        align="center"
        highContrast={true}
        size={{ xs: "4", md: "8" }}
        color="grass"
      >
        <Strong>The quick brown fox jumps over the lazy dog...</Strong>
      </Text>
      <AlertDialog.Trigger>
        <Button
          size={{ xs: "1", md: "3" }}
          variant="soft"
          radius="large"
          className="h-14 rounded-lg"
        >
          <Pencil1Icon className="w-5 h-5 md:w-6 md:h-6 mr-[2px]" />
          <Text className="text-xl md:text-2xl">Free write...</Text>
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
