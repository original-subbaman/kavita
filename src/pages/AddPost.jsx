import { Button, Container, Flex } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyCaptcha } from "../api/utils.api";
import BackButton from "../components/BackButton";
import WeeklyTheme from "../components/Home/WeeklyTheme";
import TipTapEditor from "../components/PromptSection/TipTapEditor";
import ResponseSnackbar from "../components/ResponseSnackbar";
import useAuth from "../hooks/auth/useAuth";
import useAddPost from "../hooks/post/useAddPost";
import usePostAnon from "../hooks/post/usePostAnon";
import { useAppTheme } from "../hooks/useAppTheme";

const AddPost = ({
  postId,
  userId,
  content,
  title,
  mutation,
  isEdit = false,
}) => {
  const minCharLength = 15;
  const { user, isAuthenticated } = useAuth();
  const { mode } = useAppTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState(content || "");
  const [hasAttemptedPost, setHasAttemptedPost] = useState(false);
  const [postTitle, setPostTitle] = useState(title || "");
  const [isPosting, setIsPosting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const location = useLocation();
  const writingTheme = location.state?.writingTheme;

  const postButtonTitle = isAuthenticated ? "Post" : "Post Annonymously";

  // Shared mutation handlers
  const handlePostSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["infinite_posts"],
    });
    setSnackbar({
      open: true,
      message: "Your poem has been published",
      severity: "success",
    });
    setTimeout(() => {
      navigate("/", { state: { showPostSection: true } });
    }, 3000);
    reset();
  };

  const handlePostError = () => {
    setSnackbar({
      open: true,
      message: "Cannot publish at this moment",
      severity: "error",
    });
    setAddPostDialog && setAddPostDialog(false);
  };

  const { mutate: addPost } = useAddPost({
    userId: user?.id,
    onSuccess: handlePostSuccess,
    onError: handlePostError,
  });

  const { mutate: postAnon, isPending: isPostingAnon } = usePostAnon({
    onSuccess: handlePostSuccess,
    onError: handlePostError,
  });

  const reset = () => {
    setPostContent("");
    setPostTitle("");
  };

  const handleOnPostClick = async () => {
    setHasAttemptedPost(true);

    if (postTitle.trim().length === 0) {
      setSnackbar({
        open: true,
        message: "Title cannot be empty",
        severity: "info",
      });
      return;
    }

    if (!isEdit && !isAuthenticated) {
      try {
        setIsPosting(true);
        const token = await getRecaptchaToken("anon_create_post");
        const res = await verifyCaptcha(token);
        if (res.success) {
          postAnon({
            post: postContent,
            title: postTitle,
            themeId: writingTheme?.id,
          });
        }
      } catch (err) {
        console.log("🚀 ~ handleOnPostClick ~ err:", err);
        setSnackbar({
          open: true,
          message: "Captcha verification failed",
          severity: "error",
        });
      } finally {
        setIsPosting(false);
      }

      return;
    }

    if (!isEdit && isAuthenticated) {
      addPost({
        post: postContent,
        title: postTitle,
        themeId: writingTheme?.id,
      });
      return;
    }

    if (isEdit && isAuthenticated) {
      mutation({
        post: postContent,
        postId,
        userId,
        bgColor,
      });
      return;
    }
  };

  // Button is enabled initially, disables only after first attempt if invalid
  const isPostButtonDisabled =
    hasAttemptedPost && (postContent.length === 0 || isPosting);

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
          {postButtonTitle}
        </Button>
      </Flex>
    </Container>
  );
};

async function getRecaptchaToken(action = "submit") {
  if (!window.grecaptcha) {
    throw new Error("reCAPTCHA not loaded");
  }

  return await window.grecaptcha.execute(
    import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    { action }
  );
}

export default AddPost;
