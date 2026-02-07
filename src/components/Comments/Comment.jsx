import { Box, Button, Text } from "@radix-ui/themes";
import { useDispatch } from "react-redux";
import {
  setCommentId,
  setOpenDeleteComment,
  setOpenReportComment,
} from "../../slice/postDetailSlice";
import { convertISOTimeToIST } from "../../utils/Date";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  currentUserId,
  deleteComment,
  activeComment,
  setActiveComment,
  updateComment,
  addComment,
  parentId = null,
  isAuthenticated,
  theme,
}) => {
  const dispatch = useDispatch();
  const fiveMin = 300000;
  // If comment created is less than 5 min we allow edit else we dont allow edit
  const timePassed = new Date() - new Date(comment.created_at) > fiveMin;
  // If null (not logged in) this value is false
  const canDelete = currentUserId === comment.userId && !timePassed;
  const canReport = currentUserId !== comment.userId && isAuthenticated;

  const isReplying =
    activeComment &&
    activeComment.type === "reply" &&
    activeComment.id === comment.id;

  const isEditing =
    activeComment &&
    activeComment.type === "edit" &&
    activeComment.id === comment.id;

  return (
    <Box>
      <Box className="">
        <span className="font-medium text-foreground mr-1">
          {comment.userName}
        </span>
        <span className="text-xs text-muted-foreground">
          {new Date(comment.created_at).toLocaleDateString()}
        </span>
      </Box>
      {!isEditing && <p className="text-foreground">{comment.comment}</p>}
      {isEditing && (
        <CommentForm
          submitLabel={"Update"}
          hasCancelButton
          intialText={comment.body}
          handleSubmit={(text) => {
            // update comment function like updateComment(text, comment.id)
          }}
          handleCancel={() => setActiveComment(null)}
        />
      )}
      <Box className="flex justify-end align-bottom mt-8 gap-2">
        {canReport && (
          <Button
            variant="solid"
            size={"2"}
            color="gray"
            onClick={() => {
              dispatch(setOpenReportComment(true));
              dispatch(setCommentId(comment.id));
            }}
          >
            Report
          </Button>
        )}
        {canDelete && (
          <Button
            variant="solid"
            size={"2"}
            color="red"
            onClick={() => {
              dispatch(setOpenDeleteComment(true));
              dispatch(setCommentId(comment.id));
            }}
          >
            Delete
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Comment;
