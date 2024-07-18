import { Box, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";
import Comment from "./Comment";

const CommentSection = () => {
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
  const rootComments = comments.filter((comment) => comments.parentId == null);
  return (
    <Box>
      <Heading as="h3" color="green">
        Comments
      </Heading>
      <Box as="div">
        {rootComments.map((rootComment) => (
          <Comment comment={rootComment} />
        ))}
      </Box>
    </Box>
  );
};

export default CommentSection;
