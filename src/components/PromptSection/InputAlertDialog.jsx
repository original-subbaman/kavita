import React, { useState } from "react";
import { AlertDialog, TextArea, Flex, Button } from "@radix-ui/themes";
import useAddPost from "../../hooks/post/useAddPost";
import ResponseSnackbar from "../ResponseSnackbar";
function InputAlertDialog({ closeAlert }) {
  const [post, setPost] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const { mutate: addPost, isPending: isPosting } = useAddPost({
    onSuccess: () => {
      closeAlert();
      setPost("");
    },
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
      className="w-[250px]"
      aria-labelledby="Add your writing piece"
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
      <AlertDialog.Title>Today's Prompt: Once upon a time...</AlertDialog.Title>
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
        className={`h-[550px] p-2 rounded-md`}
        placeholder="Once upon a time..."
      />
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </AlertDialog.Cancel>
        <Button variant="solid" onClick={handleOnPostClick} loading={isPosting}>
          Post
        </Button>
      </Flex>
    </AlertDialog.Content>
  );
}

export default InputAlertDialog;
