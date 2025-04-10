import { Box } from "@radix-ui/themes";
import { useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import usePostComment from "../../hooks/post/usePostComment";
import Comment from "./Comment";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import CommentForm from "./CommentForm";
import useLoadComments from "../../hooks/post/useLoadComments";
import { useQueryClient } from "@tanstack/react-query";

const CommentSection = ({
  postId,
  onPostComment,
  onPostCommentError,
  setReportError,
}) => {
  const [activeComment, setActiveComment] = useState(null);
  const queryClient = useQueryClient();
  const { user } = useAuth();

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

  const addComment = (text, parentId) => {
    mutate({ userId: user.id, postId: postId, comment: text });
    setActiveComment(null);
  };

  const deleteComment = (commentId) => {
    console.log("delete");
    // call delete comment api
  };

  const updateComment = (text, commentId) => {
    setActiveComment(null);
  };

  return (
    <Box>
      <CommentForm submitLabel="Post Comment" handleSubmit={addComment} />
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
