import React, { useState, useReducer } from "react";
import DOMPurify from "dompurify";
import {
  Button,
  Box,
  Container,
  Heading,
  Section,
  Text,
  AlertDialogRoot,
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
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import useRecordLanguage from "../hooks/language/useRecordLanguage";
import ReportDialog from "../components/PostDetail/ReportDialog";
import {
  responseReducer,
  initialState,
  actionTypes,
} from "../reducers/responseReducer";
export default function PostDetail() {
  let { id } = useParams();
  const [selectedText, setSelectedText] = useState();
  const [response, dispatch] = useReducer(responseReducer, initialState);

  const closeAlert = () => dispatch({ type: actionTypes.RESET_RESPONSE });

  const { mutate: likePost, isPending: isUpdating } = useLikePost({
    onSuccess: () =>
      dispatch({ type: actionTypes.SET_SUCCESS, payload: "Post liked" }),
    onError: () =>
      dispatch({ type: actionTypes.SET_ERROR, payload: "Post like failed" }),
    onSettled: () => {},
  });

  const { mutate: recordLanguage } = useRecordLanguage({
    onSuccess: (data) =>
      dispatch({
        type: actionTypes.SET_SUCCESS,
        payload: "Language captured successfully",
      }),
    onError: (error) =>
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: "Error capturing language",
      }),
  });

  const handleCaptureLanguage = () => {
    recordLanguage({
      language: selectedText,
      postId: id,
      userId: "1feebd99-74d7-4b2d-9692-9742e6d7dd2d", // replace by actual user id
    });
  };

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
  const post = DOMPurify.sanitize(data?.post.post);
  const hasLiked = data?.hasLiked;

  return (
    <RootWrapper>
      <AlertDialogRoot>
        <ReportDialog />
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
          <Section size={"1"} className="text-center">
            <Heading className="text-white">{author}</Heading>
            <Text className="text-gray-500">
              Posted On: {convertISOTimestamp(createdAt)}
            </Text>
          </Section>
          <Section className="rounded-md px-8 bg-gray-50 bg-opacity-5 mb-2">
            <SelectedText
              selectedText={selectedText}
              captureLanguage={handleCaptureLanguage}
            />

            <Box
              dangerouslySetInnerHTML={{ __html: post }}
              onMouseMove={(event) => getSelectionText()}
              onMouseUp={(event) => window.getSelection().removeAllRanges()}
              className="text-white text-start font-primary font-extralight whitespace-pre-line"
            />
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
            <AlertDialogTrigger>
              <Button color="gray">Report</Button>
            </AlertDialogTrigger>
          </Box>
          <CommentSection
            postId={id}
            onPostComment={() =>
              dispatch({
                type: actionTypes.SET_SUCCESS,
                payload: "Comment posted!",
              })
            }
            onPostCommentError={() =>
              dispatch({
                type: actionTypes.SET_ERROR,
                payload: "Posting comment failed",
              })
            }
          />
        </Container>
      </AlertDialogRoot>
    </RootWrapper>
  );
}
