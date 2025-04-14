import { AlertDialogPortal } from "@radix-ui/react-alert-dialog";
import { AlertDialogRoot, Box } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/auth/useAuth";
import useDeleteComment from "../../hooks/post/useDeleteComment";
import useLoadComments from "../../hooks/post/useLoadComments";
import usePostComment from "../../hooks/post/usePostComment";
import useReportComment from "../../hooks/post/useReportComment";
import {
  setOpenDeleteComment,
  setOpenReportComment,
} from "../../slice/postDetailSlice";
import { setError, setSuccess } from "../../slice/responseSlice";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import DeleteCommentDialog from "../PostDetail/DeleteCommentDialog";
import ReportCommentDialog from "../PostDetail/ReportCommentDialog";
import ResponseSnackbar from "../ResponseSnackbar";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentSection = ({
  postId,
  onPostComment,
  onPostCommentError,
  setReportError,
}) => {
  const [activeComment, setActiveComment] = useState(null);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const openDeleteComment = useSelector(
    (state) => state.postDetail.openDeleteComment
  );
  const openReportComment = useSelector(
    (state) => state.postDetail.openReportComment
  );
  const deleteCommentId = useSelector((state) => state.postDetail.commentId);
  const { success, error, message } = useSelector((state) => state.response);

  const {
    data: comments,
    isFetching,
    isError,
  } = useLoadComments({ postId: postId });

  const { mutate } = usePostComment({
    onSuccess: () => {
      onPostComment();
      queryClient.refetchQueries({ queryKey: ["load_comments", postId] });
    },
    onError: () => {
      onPostCommentError();
    },
  });

  const { mutate: deleteComment } = useDeleteComment({
    onSuccess: () => {
      dispatch(setSuccess("Comment deleted successfully"));
      dispatch(setOpenDeleteComment(false));
      queryClient.refetchQueries({ queryKey: ["load_comments"] });
    },
    onError: () => dispatch(setError("Error deleting comment")),
  });

  const { mutate: reportComment } = useReportComment({
    onSuccess: () => dispatch(setSuccess("Comment reported successfully")),
    onError: () => dispatch(setError("Error reporting comment")),
  });

  const addComment = (text, parentId) => {
    mutate({ userId: user.id, postId: postId, comment: text });
    setActiveComment(null);
  };

  const updateComment = (text, commentId) => {
    setActiveComment(null);
  };

  return (
    <Box>
      {/* Delete Comment Dialog */}
      <AlertDialogRoot open={openDeleteComment}>
        <AlertDialogPortal>
          <DeleteCommentDialog
            onClose={() => dispatch(setOpenDeleteComment(false))}
            onDelete={() => deleteComment({ commentId: deleteCommentId })}
          />
        </AlertDialogPortal>
      </AlertDialogRoot>
      {/* Report Comment Dialog */}
      <AlertDialogRoot open={openReportComment}>
        <AlertDialogPortal>
          <ReportCommentDialog
            onClose={() => dispatch(setOpenReportComment(false))}
            onReport={reportComment}
          />
        </AlertDialogPortal>
      </AlertDialogRoot>
      {/* Response Success Snackbar */}
      <ResponseSnackbar
        open={success}
        message={message}
        onClose={() => dispatch(setSuccess(false))}
      />
      {/* Response Error Snackbar */}
      <ResponseSnackbar
        open={error}
        message={message}
        onClose={() => dispatch(setError(false))}
      />
      {/* Comment Form */}
      <CommentForm submitLabel="Post Comment" handleSubmit={addComment} />
      {/* Comment List */}
      <Box as="div">
        {isFetching && <Loading message={"Fetching comments"} />}
        {isError && <ErrorMessage message={"Failed to load comments"} />}
        {comments &&
          comments.map((rootComment) => (
            <Comment
              comment={rootComment}
              currentUserId={user.id}
              deleteComment={deleteComment}
              updateComment={updateComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
            />
          ))}
      </Box>
    </Box>
  );
};

export default CommentSection;
