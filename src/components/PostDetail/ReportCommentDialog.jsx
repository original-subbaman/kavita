import React from "react";
import { AlertDialog, Flex, Button } from "@radix-ui/themes";
const ReportCommentDialog = ({ onClose }) => {
  return (
    <AlertDialog.Content maxWidth="450px">
      <AlertDialog.Title>Report Comment</AlertDialog.Title>
      <AlertDialog.Description>
        Reporting a comment means you're blacklisting it.
      </AlertDialog.Description>
      <Flex gap="3" mt="4" justify="end">
        <Button variant="soft" color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="solid" color="red">
          Report
        </Button>
      </Flex>
    </AlertDialog.Content>
  );
};

export default ReportCommentDialog;
