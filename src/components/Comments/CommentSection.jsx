import { Box } from "@radix-ui/themes";
import { useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import usePostComment from "../../hooks/post/usePostComment";
import Comment from "./Comment";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import CommentForm from "./CommentForm";
import useLoadComments from "../../hooks/post/useLoadComments";

const CommentSection = ({ postId, onPostComment, onPostCommentError }) => {
  const [activeComment, setActiveComment] = useState(null);
  const { user } = useAuth();
  // const rootComments = comments.filter((comment) => comments.parentId == null);

  const {
    data: comments,
    isFetching,
    isError,
  } = useLoadComments({ postId: postId });
  console.log("🚀 ~ CommentSection ~ comments:", comments);

  const { mutate } = usePostComment({
    onSuccess: () => {
      onPostComment();
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

  // Get replies for a parent comment and sort the replies with oldest replies last
  const getReplies = (commentId) => {
    return comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };
  return (
    <Box>
      <CommentForm submitLabel="Post" handleSubmit={addComment} />
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
