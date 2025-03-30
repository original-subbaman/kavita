import { Box, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import usePostComment from "../../hooks/post/usePostComment";
import useAuth from "../../hooks/auth/useAuth";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([
    {
      id: "1",
      body: "First comment",
      username: "Jack",
      userId: "1",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "2",
      body: "Second comment",
      username: "John",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "3",
      body: "First comment first child",
      username: "John",
      userId: "2",
      parentId: "1",
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "4",
      body: "Second comment second child",
      username: "John",
      userId: "2",
      parentId: "2",
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
  ]);
  const [activeComment, setActiveComment] = useState(null);

  const { user } = useAuth();
  const rootComments = comments.filter((comment) => comments.parentId == null);

  const { mutate } = usePostComment({ onSuccess: () => {}, onError: () => {} });

  const addComment = (text, parentId) => {
    console.log("add comment", text, parentId);
    // call add comment api
    mutate({ userId: user.id, postId: postId, comment: text });
    // after success call back
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
        {rootComments.map((rootComment) => (
          <Comment
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            currentUserId={1}
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
