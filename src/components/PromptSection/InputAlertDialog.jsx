import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import ResponseSnackbar from "../ResponseSnackbar";
import TipTapEditor from "./TipTapEditor";

export const DefaultBGColor = "#2e2b29";
const minWords = 10;

function InputAlertDialog({
  postId,
  userId,
  content,
  savedColor,
  mutation,
  mutationState,
  theme,
  isEdit = false,
}) {
  const [post, setPost] = useState(content || theme?.prompt);
  const [bgColor, setBgColor] = useState(savedColor || DefaultBGColor); // Default background color
  const [error, setError] = useState({
    lowWordCount: false,
    invalidPrompt: false,
    message: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const title = theme
    ? `Writing theme: ${theme?.prompt}`
    : isEdit
    ? "Edit post"
    : "";

  const isPostEmpty = () => {
    if (post.length === 0 || /^\s*$/.test(post)) {
      return true;
    }
    return false;
  };

  const reset = () => {
    setPost();
    setBgColor();
    setError({ lowWordCount: false, invalidPrompt: false, message: "" });
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
    if (!isEdit) {
      mutation({ post, themeId: theme?.id, bgColor });
    } else {
      mutation({
        post,
        postId,
        userId,
        bgColor,
      });
    }
    reset();
  };

  // Think about debounce later
  const onPostChange = (value) => {
    if (value.split(" ").length > minWords) {
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
      <AlertDialog.Title className="text-white text-lg font-normal">
        {title}
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
