import { useState } from "react";
import { useAppTheme } from "../hooks/useAppTheme";
import useAddPost from "../hooks/post/useAddPost";
import useAuth from "../hooks/auth/useAuth";
import TipTapEditor from "../components/PromptSection/TipTapEditor";
import { Container, AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import { useLocation } from "react-router-dom";
import { DefaultBGColor } from "../components/PromptSection/InputAlertDialog";

const AddPost = ({
  postId,
  userId,
  content,
  mutation,
  theme,
  isEdit = false,
}) => {
  const { user } = useAuth();
  const { mode } = useAppTheme();
  const [post, setPost] = useState(content || "");
  // Default background color
  const [error, setError] = useState({
    lowWordCount: false,
    invalidPrompt: false,
    message: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const location = useLocation();
  const writingTheme = location.state?.writingTheme;

  const title =
    writingTheme && writingTheme?.prompt
      ? `Writing theme: ${writingTheme?.prompt}`
      : isEdit
      ? "Edit post"
      : "";

  const { mutate: addPost, isPending: isPosting } = useAddPost({
    userId: user?.id,
    onSuccess: (data) => {
      setAddPostDialog(false);
      queryClient.invalidateQueries({
        queryKey: ["infinite_posts"],
      });
      setResponse((prev) => ({
        ...prev,
        success: true,
        message: "Your post has been published",
      }));
    },
    onError: (error) => {
      setResponse((prev) => ({
        ...prev,
        error: true,
        message: "Cannot publish at this moment",
      }));
      setAddPostDialog(false);
    },
  });

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

  const onPostChange = (value) => {
    setPost(value);
  };

  return (
    <Container className="pt-8 min-h-screen" size={"2"}>
      {snackbar.open && (
        <ResponseSnackbar
          open={true}
          severity={"error"}
          onClose={() => setSnackbar({ open: false, message: "" })}
          autoHideDuration={3000}
          message={snackbar.message}
        />
      )}
      <Text
        className={`${
          mode === "dark" ? "text-white" : "text-black"
        } text-base mb-4 mx-2 md:mx-0 md:text-lg font-normal`}
      >
        {title}
      </Text>
      {/* Error Messages */}
      {!error.lowWordCount ||
        (!error.invalidPrompt && (
          <Text className=" text-gray-500 my-2">
            Add your writing piece below
          </Text>
        ))}
      {/* Error messages */}
      {(error.lowWordCount || error.invalidPrompt) && (
        <Text color="red">{error.message}</Text>
      )}
      {/* Text Area */}
      <TipTapEditor
        initial={post}
        onChange={onPostChange}
        bgColor={"#F8FAFC"}
      />
      <Flex gap="3" mt="4" justify="end" className="mx-2 md:mx-0">
        <Button
          variant="solid"
          disabled={error.lowWordCount}
          onClick={handleOnPostClick}
          loading={isPosting.toString()}
        >
          Post
        </Button>
      </Flex>
    </Container>
  );
};

export default AddPost;
