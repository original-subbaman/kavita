import React from "react";
import { AlertDialog, Flex, Button } from "@radix-ui/themes";

function DeleteCommentDialog({ onDelete, onClose }) {
  return (
    <AlertDialog.Content maxWidth="450px">
      <AlertDialog.Title>Delete Comment</AlertDialog.Title>
      <AlertDialog.Description>
        Are you sure you want to delete this comment? This action cannot be
        undone.
      </AlertDialog.Description>
      <Flex gap="3" mt="4" justify="end">
        <Button variant="soft" color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="solid" color="red" onClick={onDelete}>
          Delete
        </Button>
      </Flex>
    </AlertDialog.Content>
  );
}

export default DeleteCommentDialog;
