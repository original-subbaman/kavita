import { Button, Container, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TipTapEditor from "../components/PromptSection/TipTapEditor";
import ResponseSnackbar from "../components/ResponseSnackbar";
import useAuth from "../hooks/auth/useAuth";
import useAddPost from "../hooks/post/useAddPost";
import { useAppTheme } from "../hooks/useAppTheme";
import { useQueryClient } from "@tanstack/react-query";
import WeeklyTheme from "../components/Home/WeeklyTheme";
import BackButton from "../components/BackButton";

const AddPost = ({
  postId,
  userId,
  content,
  title,
  mutation,
  isEdit = false,
}) => {
  const minCharLength = 15;
  const { user } = useAuth();
  const { mode } = useAppTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState(content || "");
  const [postTitle, setPostTitle] = useState(title || "");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const location = useLocation();
  const writingTheme = location.state?.writingTheme;

  const { mutate: addPost, isPending: isPosting } = useAddPost({
    userId: user?.id,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["infinite_posts"],
      });
      setSnackbar({
        open: true,
        message: "Your post has been published",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
      reset();
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        message: "Cannot publish at this moment",
        severity: "error",
      });
      setAddPostDialog && setAddPostDialog(false);
    },
  });

  const reset = () => {
    setPostContent();
    setPostTitle();
    setError({ lowWordCount: false, invalidPrompt: false, message: "" });
  };

  const handleOnPostClick = async () => {
    const wordsInPost = postContent.split(" ").length;

    if (postTitle.trim().length === 0) {
      setSnackbar({
        open: true,
        message: "Title cannot be empty",
        severity: "info",
      });
      return;
    }

    if (wordsInPost < minCharLength) {
      setError((prev) => ({
        ...prev,
        lowWordCount: true,
        message: `At least ${minCharLength} words required`,
      }));
      return;
    }

    if (!isEdit) {
      addPost({
        post: postContent,
        title: postTitle,
        themeId: writingTheme?.id,
      });
    } else {
      mutation({
        post: postContent,
        postId,
        userId,
        bgColor,
      });
    }
  };

  const isPostButtonDisabled =
    postContent.length === 0 ||
    isPosting ||
    postContent.trim().length < minCharLength;

  return (
    <Container className="pt-8 min-h-screen" size={"2"}>
      {snackbar.open && (
        <ResponseSnackbar
          open={true}
          severity={snackbar.severity}
          onClose={() => setSnackbar({ open: false, message: "" })}
          autoHideDuration={3000}
          message={snackbar.message}
        />
      )}
      <BackButton />
      {/* Writing Theme */}
      <div className="my-2 ">
        <WeeklyTheme writingTheme={writingTheme?.prompt} theme={mode} />
      </div>
      {/* Text Area */}
      <TipTapEditor
        initialContent={postContent}
        initialTitle={postTitle}
        onContentChange={(value) => {
          setPostContent(value);
        }}
        onTitleChange={(value) => setPostTitle(value)}
        bgColor={"#F8FAFC"}
      />
      <Flex gap="3" mt="4" justify="end" className="mx-2 md:mx-0">
        <Button
          variant="solid"
          disabled={isPostButtonDisabled}
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
