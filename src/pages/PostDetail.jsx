import { AlertDialogPortal } from "@radix-ui/react-alert-dialog";
import {
  ArrowTopRightIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import {
  AlertDialogRoot,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import DOMPurify from "dompurify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppTheme } from "../hooks/useAppTheme";
import CommentSection from "../components/Comments/CommentSection";
import ReportPostDialog from "../components/PostDetail/ReportPostDialog";
import ResponseSnackbar from "../components/ResponseSnackbar";
import ScrollToTop from "../components/ScrollToTop";
import SelectedText from "../components/SelectedText";
import useAuth from "../hooks/auth/useAuth";
import useRecordLanguage from "../hooks/language/useRecordLanguage";
import useCreateNotification from "../hooks/notification/useCreateNotification";
import useRemovePostNotification from "../hooks/notification/useRemovePostNotification";
import useGetPost from "../hooks/post/useGetPost";
import useReportPost from "../hooks/post/useReportPost";
import useToggleLikeOnPost from "../hooks/post/useToggleLikeOnPost";
import { actionTypes } from "../reducers/responseReducer";
import { setOpenReportPost } from "../slice/postDetailSlice";
import { resetResponse, setError, setSuccess } from "../slice/responseSlice";
import { NotificationTarget, NotificationType } from "../utils/Constants";
import { convertISOTimestamp } from "../utils/Date";
import { motion } from "framer-motion";
import BackButton from "../components/BackButton";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // Delay between letters
    },
  },
};

const letterVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function PostDetail() {
  const navigate = useNavigate();
  const { mode } = useAppTheme();
  const { user, isAuthenticated } = useAuth();
  let { id } = useParams();

  const openReportPost = useSelector(
    (state) => state.postDetail.openReportPost
  );
  const { success, error, message } = useSelector((state) => state.response);
  const dispatch = useDispatch();
  const [selectedText, setSelectedText] = useState();

  const closeAlert = () => dispatch(resetResponse());

  const { data: post } = useGetPost({
    postId: id,
    userId: user?.id,
    isUpdating: false,
    staleTime: 0,
    select: (response) => {
      return { ...response.post, hasLiked: response.hasLiked };
    },
  });

  const author = post?.profiles.user_name;
  const authorId = post?.profiles.id;
  const createdAt = post?.created_at;
  const content = DOMPurify.sanitize(post?.post);
  const hasLiked = post?.hasLiked;
  const contentBGColor = post?.bg_color;
  const isAuthorCurrUser = user?.id === authorId;

  const { mutate: toggleLike, isPending: isUpdating } = useToggleLikeOnPost({
    onSuccess: (data, variables, context) => {
      const { success, isLiked } = data;
      if (success && !isAuthorCurrUser && isLiked) {
        notifyUser({
          postId: id,
          recipientId: authorId,
          senderId: user.id,
          message: `@${user.user_name} liked your post`,
          type: NotificationType.like,
          target: NotificationTarget.post,
        });
      }

      if (success && !isAuthorCurrUser && !isLiked) {
        rmPostNotification({
          postId: id,
          recipientId: authorId,
          senderId: user.id,
        });
      }
    },
  });

  const { mutate: recordLanguage } = useRecordLanguage({
    onSuccess: (data) => {
      let quote = "";

      if (data && Array.isArray(data) && data.length > 0) {
        quote = data[0]?.language;
      }

      if (!isAuthorCurrUser && quote && quote !== "") {
        notifyUser({
          postId: id,
          recipientId: authorId,
          senderId: user.id,
          message: `@${user.user_name} has captured a line from your writing piece: ${quote}`,
          type: NotificationType.quote,
          target: NotificationTarget.post,
        });
      }

      dispatch(setSuccess("Language captured successfully"));
    },
    onError: (error) => dispatch(setError("Error capturing language")),
  });

  const { mutate: reportPost } = useReportPost(
    () => dispatch(setSuccess("Post reported successfully")),
    (error) => {
      dispatch(setError(error?.message || "Error reporting post"));
    }
  );

  const { mutate: notifyUser } = useCreateNotification(
    () => {
      console.log("post notified");
    },
    (error) => {
      console.log(error);
    }
  );

  const { mutate: rmPostNotification } = useRemovePostNotification(
    () => {
      console.log("rm post notified");
    },
    (error) => {
      console.log(error);
    }
  );

  const handleCaptureLanguage = () => {
    if (isAuthenticated) {
      recordLanguage({
        language: selectedText,
        postId: id,
        userId: user?.id, // replace by actual user id
      });
      setSelectedText("");
      return;
    }
    navigate("/login");
  };

  function getSelectionText() {
    const selection = window.getSelection().toString();
    if (selection) {
      setSelectedText(selection);
    }
  }

  async function handleLikePost(postId, userId) {
    if (isAuthenticated) {
      toggleLike({ postId, userId: userId });
      return;
    }
    navigate("/login");
  }

  function handleReportClick() {
    if (isAuthenticated) {
      dispatch(setOpenReportPost(true));
      return;
    }
    navigate("/login");
  }

  function onPostComment(response) {
    dispatch({
      type: actionTypes.SET_SUCCESS,
      payload: "Comment posted!",
    });

    const comment = response?.comment;
    const message = `@${user.user_name} commented on your post${
      comment ? `: ${comment}` : "."
    }`;

    notifyUser({
      postId: id,
      recipientId: authorId,
      senderId: user.id,
      message: message,
      type: NotificationType.comment,
      target: NotificationTarget.post,
    });
  }

  function navigateToAuthorProfile() {
    navigate(`/author/${authorId}`);
  }

  return (
    <>
      <ScrollToTop />
      {/* Report Post Dialog */}
      <AlertDialogRoot open={openReportPost}>
        <AlertDialogPortal>
          <ReportPostDialog
            onClose={() => dispatch(setOpenReportPost(false))}
            onConfirm={reportPost}
            postId={id}
            userId={user?.id}
          />
        </AlertDialogPortal>
      </AlertDialogRoot>
      {/* Error Deleting Message */}
      <ResponseSnackbar
        open={error}
        autoHideDuration={3000}
        onClose={closeAlert}
        severity={"error"}
        message={message}
      />
      {/* Success Deleting Message */}
      <ResponseSnackbar
        open={success}
        autoHideDuration={3000}
        onClose={closeAlert}
        severity={"success"}
        message={message}
      />
      <Container size={"2"} className="mx-3 md:mx-0">
        {/* Author Section */}
        <Section size={"1"} className={` text-start`}>
          <Flex gap={"2"} align={"start"}>
            <BackButton size="3" />
            <Box>
              {author ? (
                <Box className="flex items-center gap-4">
                  <AnimatedText text={author || ""} theme={mode} />
                  <Button
                    variant="ghost"
                    size={"2"}
                    color="orange"
                    onClick={navigateToAuthorProfile}
                  >
                    View More <ArrowTopRightIcon />
                  </Button>
                </Box>
              ) : (
                <div className="h-[28px]"></div>
              )}
              <Text className="text-gray-500">
                Posted On: {convertISOTimestamp(createdAt)}
              </Text>
            </Box>
          </Flex>
        </Section>
        {/* Capture Language Section */}
        <SelectedText
          selectedText={selectedText}
          captureLanguage={handleCaptureLanguage}
          theme={mode}
        />
        {/* Post Section */}
        <Section
          className={`
          min-h-[50vh] py-10 px-4
          ${
            mode === "dark"
              ? "bg-brownish-dark text-white"
              : "bg-white border border-gray-300 text-black"
          }
          rounded-lg 
          mb-2 md:px-8`}
        >
          {content && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
            >
              <Box
                dangerouslySetInnerHTML={{ __html: content || "" }}
                onMouseMove={(event) => getSelectionText()}
                onMouseUp={(event) => window.getSelection().removeAllRanges()}
                className="text-start font-primary text-2xl  whitespace-pre-line"
              />
            </motion.div>
          )}
        </Section>
        <Box className="flex items-end justify-end   gap-4 my-0  max-h-['10px']">
          {/* Like Button */}
          <Button
            className="cursor-pointer"
            onClick={() => handleLikePost(id, user?.id)}
          >
            {hasLiked ? <HeartFilledIcon /> : <HeartIcon />}
            Like
          </Button>
          {/* Report Button */}
          {!isAuthorCurrUser && (
            <Button
              className="cursor-pointer"
              color="gray"
              onClick={handleReportClick}
            >
              Report
            </Button>
          )}
        </Box>
        <Box className="mb-8">
          <CommentSection
            postId={id}
            onPostComment={onPostComment}
            onPostCommentError={() =>
              dispatch({
                type: actionTypes.SET_ERROR,
                payload: "Posting comment failed",
              })
            }
          />
        </Box>
      </Container>
    </>
  );
}

function AnimatedText({ text, theme }) {
  return (
    <motion.div
      className={`flex overflow-hidden font-primary font-bold text-lg ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
