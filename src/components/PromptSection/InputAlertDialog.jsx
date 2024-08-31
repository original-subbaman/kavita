import React, { useState } from "react";
import { AlertDialog, TextArea, Flex, Button } from "@radix-ui/themes";
import ResponseSnackbar from "../ResponseSnackbar";
function InputAlertDialog({ addPost, mutationState, prompt }) {
  const [post, setPost] = useState(prompt);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const isPostEmpty = () => {
    if (post.length === 0 || /^\s*$/.test(post)) {
      return true;
    }
    return false;
  };

  const handleOnPostClick = async () => {
    if (isPostEmpty()) {
      setSnackbar({ open: true, message: "Empty text field" });
    } else {
      addPost({ post: post });
    }
  };

  // Think about debounce later
  const onPostChange = (event) => setPost(event.target.value);

  return (
    <AlertDialog.Content
      className="w-[600px]"
      aria-describedby="Add your writing piece"
    >
      {snackbar.open && (
        <ResponseSnackbar
          open={true}
          severity={"error"}
          onClose={() => setSnackbar({ open: false, message: "" })}
          autoHideDuration={3000}
          message={snackbar.message}
        />
      )}
      <AlertDialog.Title className="text-white text-xl font-bold">
        Today's Prompt: Once upon a time...
      </AlertDialog.Title>
      <AlertDialog.Description className=" text-gray-500 my-2">
        Add your writing piece below
      </AlertDialog.Description>
      <TextArea
        onChange={onPostChange}
        value={post}
        size={{
          xs: "1",
          sm: "2",
          md: "3",
        }}
        autoFocus={true}
        required
        className={`h-[550px] rounded-md mt-2 border `}
        placeholder="Once upon a time..."
      />
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </AlertDialog.Cancel>
        <Button
          variant="solid"
          onClick={handleOnPostClick}
          loading={mutationState.toString()}
        >
          Post
        </Button>
      </Flex>
    </AlertDialog.Content>
  );
}

export default InputAlertDialog;
