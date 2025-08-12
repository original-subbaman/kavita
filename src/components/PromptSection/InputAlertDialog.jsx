import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import ResponseSnackbar from "../ResponseSnackbar";
import TipTapEditor from "./TipTapEditor";

export const DefaultBGColor = "#2e2b29";
const minWords = 10;
function InputAlertDialog({ addPost, mutationState, prompt }) {
  const [post, setPost] = useState(prompt);
  const [bgColor, setBgColor] = useState(); // Default background color
  const [error, setError] = useState({
    lowWordCount: false,
    invalidPrompt: false,
    message: "",
  });
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
    const wordsInPost = post.split(" ").length;

    if (isPostEmpty()) {
      setSnackbar({ open: true, message: "Empty text field" });
      return;
    }

    if (wordsInPost < minWords) {
      setError((prev) => ({
        ...prev,
        lowWordCount: true,
        message: `Your post must have at least ${minWords} words before submitting`,
      }));
      return;
    }

    addPost({ post, bgColor });
  };

  // Think about debounce later
  const onPostChange = (value) => {
    if (post.split(" ").length > minWords) {
      setError((prev) => ({ ...prev, lowWordCount: false, message: "" }));
    }
    setPost(value);
  };

  return (
    <AlertDialog.Content
      className="w-[600px] "
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
      {/* Error Messages */}
      {!error.lowWordCount ||
        (!error.invalidPrompt && (
          <AlertDialog.Description className=" text-gray-500 my-2">
            Add your writing piece below
          </AlertDialog.Description>
        ))}
      {/* Error messages */}
      {(error.lowWordCount || error.invalidPrompt) && (
        <Text color="red">{error.message}</Text>
      )}
      {/* Text Area */}
      <div>
        <TipTapEditor
          initial={post}
          onChange={onPostChange}
          bgColor={bgColor}
          setBgColor={setBgColor}
        />
      </div>
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </AlertDialog.Cancel>
        <Button
          variant="solid"
          disabled={error.lowWordCount}
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
