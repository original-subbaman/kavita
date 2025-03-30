import { Text, Box, Button } from "@radix-ui/themes";
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
}) => {
  const fiveMin = 300000;
  // If comment created is less than 5 min we allow edit else we dont allow edit
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMin;
  // If null (not logged in) this value is false
  const canDelete = currentUserId === comment.userId && !timePassed;

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
      <Box className="flex justify-end align-bottom mt-8">
        {canDelete && (
          <Button
            variant="soft"
            size={"3"}
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Comment;
