import { Box, Button, Text } from "@radix-ui/themes";
import { convertISOTimeToIST } from "../../utils/Date";
import { useDispatch } from "react-redux";
import CommentForm from "./CommentForm";
import {
  setCommentId,
  setOpenDeleteComment,
  setOpenReportComment,
} from "../../slice/postDetailSlice";
const Comment = ({
  comment,
  currentUserId,
  deleteComment,
  activeComment,
  setActiveComment,
  updateComment,
  addComment,
  parentId = null,
}) => {
  const dispatch = useDispatch();
  const fiveMin = 300000;
  // If comment created is less than 5 min we allow edit else we dont allow edit
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMin;
  // If null (not logged in) this value is false
  const canDelete = currentUserId === comment.userId && !timePassed;
  const canReport = currentUserId !== comment.userId;

  const isReplying =
    activeComment &&
    activeComment.type === "reply" &&
    activeComment.id === comment.id;

  const isEditing =
    activeComment &&
    activeComment.type === "edit" &&
    activeComment.id === comment.id;

  return (
    <Box className="text-white my-2 rounded-md p-4 bg-slate-600/30">
      <Box className="mb-4">
        <Text weight={"medium"} className="block" size={"4"}>
          {comment.userName}
        </Text>
        <Text className="text-white" size={"2"}>
          {convertISOTimeToIST(comment.created_at)}
        </Text>
      </Box>
      {!isEditing && <Text>{comment.comment}</Text>}
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
            onClick={() => dispatch(setOpenReportComment(true))}
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
              // deleteComment(comment.id);
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
