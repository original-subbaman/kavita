import React, { useState } from "react";
import {
  Button,
  Box,
  Container,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import RootWrapper from "../components/RootWrapper";
import CommentSection from "../components/Comments/CommentSection";
import SelectedText from "../components/SelectedText";
import useGetPost from "../hooks/post/useGetPost";
import { convertISOTimestamp } from "../utils/Date";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import useLikePost from "../hooks/post/useLikePost";
import ResponseSnackbar from "../components/ResponseSnackbar";
export default function PostDetail() {
  let { id } = useParams();
  const [selectedText, setSelectedText] = useState();
  const [response, setResponse] = useState({
    success: false,
    error: false,
    message: "",
  });

  const onPostLikeSuccess = () =>
    setResponse({ success: true, error: false, message: "Post liked" });
  const onPostLikeError = (error) => {
    setResponse({ success: false, error: true, message: "Error liking post" });
  };
  const closeAlert = () =>
    setResponse({ success: false, error: false, message: "" });

  const { mutate: likePost, isPending: isUpdating } = useLikePost({
    onSuccess: onPostLikeSuccess,
    onError: onPostLikeError,
    onSettled: () => {},
  });

  const { data } = useGetPost({
    postId: id,
    userId: "1feebd99-74d7-4b2d-9692-9742e6d7dd2d",
    isUpdating: isUpdating,
  });

  function getSelectionText() {
    const selection = window.getSelection().toString();
    if (selection) {
      setSelectedText(selection);
    }
  }

  const author = data?.post.user.name;
  const createdAt = data?.post.created_at;
  const post = data?.post.post;
  const hasLiked = data?.hasLiked;

  return (
    <RootWrapper>
      <ResponseSnackbar
        open={response.error}
        autoHideDuration={3000}
        onClose={closeAlert}
        severity={"error"}
        message={response.message}
      />
      <ResponseSnackbar
        open={response.success}
        autoHideDuration={3000}
        onClose={closeAlert}
        severity={"success"}
        message={response.message}
      />
      <Container>
        <div>a;slkdfja;sd</div>
        <Section size={"1"} className="text-center">
          <Heading className="text-white">{author}</Heading>
          <Text className="text-gray-500">
            Posted On: {convertISOTimestamp(createdAt)}
          </Text>
        </Section>
        <Section className="rounded-md px-8 bg-gray-50 bg-opacity-5 mb-2">
          <SelectedText selectedText={selectedText} />
          <Text
            onMouseMove={(event) => getSelectionText()}
            onMouseUp={(event) => window.getSelection().removeAllRanges()}
            size={"6"}
            className="text-white text-start font-primary font-extralight whitespace-pre-line"
          >
            {post}
          </Text>
        </Section>
        <Box className="flex items-end justify-end   gap-4 my-0  max-h-['10px']">
          <Button
            onClick={() =>
              likePost({
                postId: id,
                userId: "1feebd99-74d7-4b2d-9692-9742e6d7dd2d",
              })
            }
          >
            {hasLiked ? <HeartFilledIcon /> : <HeartIcon />}
            Like
          </Button>
          <Button color="gray">Report</Button>
        </Box>
        <CommentSection />
      </Container>
    </RootWrapper>
  );
}
