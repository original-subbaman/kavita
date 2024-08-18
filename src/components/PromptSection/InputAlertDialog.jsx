import React, { useState } from "react";
import {
  AlertDialog,
  TextArea,
  Flex,
  Button,
  AlertDialogDescription,
} from "@radix-ui/themes";
import { addPost } from "../../api/post.api";
function InputAlertDialog(props) {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState("");

  const handleOnPostClick = async () => {
    setLoading(true);
    const newPost = { post: post };
    const res = await addPost(newPost);
    if (res) {
      console.log(res);
    }
    setLoading(false);
  };

  // Think about debounce later
  const onPostChange = (event) => setPost(event.target.value);

  return (
    <AlertDialog.Content
      className="w-[250px]"
      aria-labelledby="Add your writing piece"
    >
      <AlertDialog.Title>Today's Prompt: Once upon a time...</AlertDialog.Title>
      <TextArea
        onChange={onPostChange}
        value={post}
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
          <Button variant="solid" onClick={handleOnPostClick} loading={loading}>
            Post
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  );
}

export default InputAlertDialog;
