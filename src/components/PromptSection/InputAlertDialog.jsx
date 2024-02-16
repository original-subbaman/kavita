import React from "react";
import { AlertDialog, TextArea, Flex, Button } from "@radix-ui/themes";
function InputAlertDialog(props) {
  return (
    <AlertDialog.Content className="w-[250px]">
      <AlertDialog.Title>Today's Prompt: Once upon a time...</AlertDialog.Title>
      <TextArea
        size={{
          xs: "1",
          sm: "2",
          md: "3",
        }}
        className="h-[350px] p-2 rounded-md"
        placeholder="Once upon a time..."
      />
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
  );
}

export default InputAlertDialog;
