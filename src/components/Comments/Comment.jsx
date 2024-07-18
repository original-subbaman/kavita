import { Text, Box, Button } from "@radix-ui/themes";
import { convertISOTimeToIST } from "../../utils/Date";
const Comment = ({ comment }) => {
  return (
    <Box className="bg-white opacity-90 my-2 rounded-md p-4">
      <Box className="mb-4">
        <Text weight={"medium"} className="block" size={"4"}>
          {comment.username}
        </Text>
        <Text className="" color="gray" size={"2"}>
          {convertISOTimeToIST(comment.createdAt)}
        </Text>
      </Box>
      <Text>{comment.body}</Text>
      <Box className="flex gap-8 align-bottom mt-8">
        <Button variant="ghost" className="font-semibold">
          Reply
        </Button>
        <Button variant="ghost">Edit</Button>
        <Button variant="ghost">Delete</Button>
      </Box>
    </Box>
  );
};

export default Comment;
