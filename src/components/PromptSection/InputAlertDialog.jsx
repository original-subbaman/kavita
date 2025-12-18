import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import ResponseSnackbar from "../ResponseSnackbar";
import TipTapEditor from "./TipTapEditor";
import { useAppTheme } from "../../hooks/useAppTheme";
import { set } from "date-fns";

export const DefaultBGColor = "#2e2b29";
const minWords = 10;

function InputAlertDialog({
  postId,
  userId,
  dialogTitle,
  contentTitle,
  content,
  savedColor,
  mutation,
  mutationState,
  theme,
  isEdit = false,
}) {
  const { mode } = useAppTheme();
  const [postContent, setPostContent] = useState(content || "");
  const [postTitle, setPostTitle] = useState(contentTitle || "");
  const [bgColor, setBgColor] = useState(
    mode === "dark" ? DefaultBGColor : "#ffffff"
  ); // Default background color
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
    if (postContent.length === 0 || /^\s*$/.test(postContent)) {
      return true;
    }
    return false;
  };

  const reset = () => {
    setPostContent();
    setBgColor();
    setError({ lowWordCount: false, invalidPrompt: false, message: "" });
  };

  const handleOnPostClick = async () => {
    if (isPostEmpty()) {
      setSnackbar({ open: true, message: "Empty text field" });
      return;
    }

    mutation({
      post: postContent,
      title: postTitle,
      postId,
      userId,
      bgColor,
    });
    reset();
  };

  // Think about debounce later
  const onPostChange = (value) => {
    if (value.split(" ").length > minWords) {
      setError((prev) => ({ ...prev, lowWordCount: false, message: "" }));
    }
    setPostContent(value);
  };

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
      <AlertDialog.Title
        className={`${
          mode === "dark" ? "text-white" : "text-black"
        } text-base md:text-lg font-normal`}
      >
        {dialogTitle}
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
          initialContent={postContent}
          initialTitle={postTitle}
          onContentChange={(value) => {
            setPostContent(value);
          }}
          onTitleChange={(value) => setPostTitle(value)}
          bgColor={bgColor}
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
