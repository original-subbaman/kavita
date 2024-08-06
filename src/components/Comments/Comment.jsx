import { Text, Box, Button } from "@radix-ui/themes";
import { convertISOTimeToIST } from "../../utils/Date";
import CommentForm from "./CommentForm";
const Comment = ({
  comment,
  replies,
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
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const canDelete = currentUserId === comment.userId && !timePassed;

  const isReplying =
    activeComment &&
    activeComment.type === "reply" &&
    activeComment.id === comment.id;

  const isEditing =
    activeComment &&
    activeComment.type === "edit" &&
    activeComment.id === comment.id;

  const replyId = parentId ? parentId : comment.id;

  return (
    <Box className="text-white my-2 rounded-md p-4 bg-slate-500/40">
      <Box className="mb-4">
        <Text weight={"medium"} className="block" size={"4"}>
          {comment.username}
        </Text>
        <Text className="text-white" size={"2"}>
          {convertISOTimeToIST(comment.createdAt)}
        </Text>
      </Box>
      {!isEditing && <Text>{comment.body}</Text>}
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
      <Box className="flex gap-8 align-bottom mt-8">
        {canReply && (
          <Button
            variant="ghost"
            className="font-semibold"
            onClick={() => setActiveComment({ id: comment.id, type: "reply" })}
          >
            Reply
          </Button>
        )}
        {canEdit && (
          <Button
            variant="ghost"
            onClick={() => setActiveComment({ id: comment.id, type: "edit" })}
          >
            Edit
          </Button>
        )}
        {canDelete && (
          <Button variant="ghost" onClick={() => deleteComment(comment.id)}>
            Delete
          </Button>
        )}
      </Box>
      {isReplying && (
        <CommentForm
          submitLabel={"Reply"}
          handleSubmit={(text) => {
            // call add comment with text and parent id
            addComment(text, replyId);
            console.log("reply");
          }}
        >
          Reply form
        </CommentForm>
      )}
      {replies.length > 0 && (
        <div>
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              replies={[]}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              updateComment={updateComment}
              parentId={comment.id}
              addComment={addComment}
            />
          ))}
        </div>
      )}
    </Box>
  );
};

export default Comment;
