import { AlertDialogPortal } from "@radix-ui/react-alert-dialog";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { AlertDialogRoot, Box } from "@radix-ui/themes";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { Calendar, Flag, Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import CommentSection from "../components/Comments/CommentSection";
import ReportPostDialog from "../components/PostDetail/ReportPostDialog";
import ResponseSnackbar from "../components/ResponseSnackbar";
import ScrollToTop from "../components/ScrollToTop";
import SelectedText from "../components/SelectedText";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import useAuth from "../hooks/auth/useAuth";
import useRecordLanguage from "../hooks/language/useRecordLanguage";
import useCreateNotification from "../hooks/notification/useCreateNotification";
import useRemovePostNotification from "../hooks/notification/useRemovePostNotification";
import useGetPost from "../hooks/post/useGetPost";
import useReportPost from "../hooks/post/useReportPost";
import useToggleLikeOnPost from "../hooks/post/useToggleLikeOnPost";
import { useAppTheme } from "../hooks/useAppTheme";
import { actionTypes } from "../reducers/responseReducer";
import { setOpenReportPost } from "../slice/postDetailSlice";
import { resetResponse, setError, setSuccess } from "../slice/responseSlice";
import { NotificationTarget, NotificationType } from "../utils/Constants";
import { convertISOTimestamp } from "../utils/Date";
import { cn } from "../utils/Helper";
import { postComment } from "../api/post.api";

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
    (state) => state.postDetail.openReportPost,
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

  const isAnonPost = post?.is_anon_post;
  const author = isAnonPost ? post?.anon_author : post?.profiles.user_name;
  const authorId = !isAnonPost ? post?.profiles.id : null;
  const createdAt = post?.created_at;
  const postTitle = DOMPurify.sanitize(post?.post_title);
  const content = DOMPurify.sanitize(post?.post);
  const hasLiked = post?.hasLiked;
  const contentBGColor = post?.bg_color;
  const isAuthorCurrUser = user?.id === authorId;
  const likesCount = post?.likes[0]?.count || 0;
  const commentCount = post?.post_comment[0]?.count || 0;

  // Mutations

  const { mutate: toggleLike, isPending: isUpdating } = useToggleLikeOnPost({
    onSuccess: (data, variables, context) => {
      if (isAnonPost) return; // No notification if post is anonymously created
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
      dispatch(setSuccess("Language captured successfully"));

      if (isAnonPost) return; // No notification if post is anonymously created

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
    },
    onError: (error) => dispatch(setError("Error capturing language")),
  });

  const { mutate: reportPost } = useReportPost(
    () => dispatch(setSuccess("Post reported successfully")),
    (error) => {
      dispatch(setError(error?.message || "Error reporting post"));
    },
  );

  const { mutate: notifyUser } = useCreateNotification(
    () => {
      console.log("post notified");
    },
    (error) => {
      console.log(error);
    },
  );

  const { mutate: rmPostNotification } = useRemovePostNotification(
    () => {
      console.log("rm post notified");
    },
    (error) => {
      console.log(error);
    },
  );

  // Handlers
  const handleCaptureLanguage = () => {
    if (isAuthenticated) {
      recordLanguage({
        language: selectedText,
        postId: id,
        userId: user?.id,
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

    if (isAnonPost) return; // No notification if post is anonymously created

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
  let authorAvatar = post?.profiles?.profile_link;
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
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <BackButton size="3" />
          <p>Back to Feed</p>
        </div>

        <article className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-soft mb-8">
          {/* Header */}
          <PostHeader
            author={author}
            authorAvatar={authorAvatar}
            isAnonPost={isAnonPost}
            navigateToAuthorProfile={navigateToAuthorProfile}
            createdAt={createdAt}
          />
          {/* Post Title */}
          <div>
            {postTitle && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: postTitle || "" }}
                  className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
                />
              </motion.div>
            )}
          </div>
          {/* Post Content */}
          <div>
            {content && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: content || "" }}
                  onMouseMove={(event) => getSelectionText()}
                  onMouseUp={(event) => window.getSelection().removeAllRanges()}
                  className="font-poetry text-xl md:text-2xl leading-relaxed text-foreground whitespace-pre-line mb-8"
                />
              </motion.div>
            )}
          </div>

          {/* Capture Language Section */}
          <div className="mb-8">
            <SelectedText
              selectedText={selectedText}
              captureLanguage={handleCaptureLanguage}
              theme={mode}
            />
          </div>

          {/* Actions */}
          <Box className="flex items-center gap-2 pt-6 border-t border-border">
            {/* Like Button */}
            <Button
              variant="ghost"
              onClick={() => handleLikePost(id, user?.id)}
              className={cn(
                "gap-2",
                hasLiked
                  ? "text-prayer-red"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              <Heart className={cn("w-5 h-5", hasLiked && "fill-current")} />
              <span>{likesCount + (hasLiked ? 1 : 0)}</span>
            </Button>
            {/* Comment */}
            <Button
              variant="ghost"
              className="gap-2 text-muted-foreground hover:text-primary"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{commentCount}</span>
            </Button>
            <Button
              variant="ghost"
              className="gap-2 text-muted-foreground hover:text-primary "
            >
              <Share2 className="w-5 h-5" />
              Share
            </Button>
            {/* Report Button */}
            {!isAuthorCurrUser && (
              <Button
                variant="ghost"
                onClick={handleReportClick}
                className="text-muted-foreground hover:text-primary ml-auto"
              >
                <Flag className="w-5 h-5 mr-1" />
                Report
              </Button>
            )}
          </Box>
        </article>

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
      </div>
    </>
  );
}

function PostHeader({
  author,
  authorAvatar,
  isAnonPost,
  navigateToAuthorProfile,
  createdAt,
}) {
  return (
    <div className="flex items-start justify-between mb-8 pb-6 border-b border-border">
      <div className="flex items-center gap-4">
        <Avatar className="w-14 h-14">
          <AvatarImage src={authorAvatar} alt={author} />
          <AvatarFallback className="bg-secondary text-secondary-foreground text-lg">
            {author?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex gap-1">
            <AnimatedText text={author || ""} />
            {author ? (
              <Box className="flex items-center gap-4">
                {!isAnonPost && (
                  <Button
                    variant="ghost"
                    size={"2"}
                    color="orange"
                    onClick={navigateToAuthorProfile}
                  >
                    View More <ArrowTopRightIcon />
                  </Button>
                )}
              </Box>
            ) : (
              <div className="h-[28px]"></div>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {convertISOTimestamp(createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedText({ text }) {
  return (
    <motion.div
      className={`flex overflow-hidden font-primary font-semibold text-lg text-foreground`}
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
