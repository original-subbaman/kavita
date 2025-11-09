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
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMin;
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
    <Box
      className={` my-2 rounded-md p-4  ${
        theme === "dark"
          ? "bg-slate-600/30 text-white"
          : "border border-gray-300 text-black"
      }`}
    >
      <Box className="mb-4">
        <Text weight={"medium"} className="block" size={"4"}>
          {comment.userName}
        </Text>
        <Text
          size={"2"}
          className={`${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}
        >
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
