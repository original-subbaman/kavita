import { AlertDialogPortal } from "@radix-ui/react-alert-dialog";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import {
  AlertDialogRoot,
  Box,
  Button,
  Container,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import DOMPurify from "dompurify";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentSection from "../components/Comments/CommentSection";
import ReportDialog from "../components/PostDetail/ReportDialog";
import ResponseSnackbar from "../components/ResponseSnackbar";
import RootWrapper from "../components/RootWrapper";
import ScrollToTop from "../components/ScrollToTop";
import SelectedText from "../components/SelectedText";
import useRecordLanguage from "../hooks/language/useRecordLanguage";
import useGetPost from "../hooks/post/useGetPost";
import useLikePost from "../hooks/post/useLikePost";
import { actionTypes } from "../reducers/responseReducer";
import { setOpenReportPost } from "../slice/postDetailSlice";
import { resetResponse, setError, setSuccess } from "../slice/responseSlice";
import { convertISOTimestamp } from "../utils/Date";
import useAuth from "../hooks/auth/useAuth";
export default function PostDetail() {
  const { user } = useAuth();
  let { id } = useParams();

  const openReportPost = useSelector(
    (state) => state.postDetail.openReportPost
  );
  const { success, error, message } = useSelector((state) => state.response);
  const dispatch = useDispatch();
  const [selectedText, setSelectedText] = useState();

  const closeAlert = () => dispatch(resetResponse());

  const { mutate: likePost, isPending: isUpdating } = useLikePost({
    onSuccess: () => dispatch(setSuccess("Post liked successfully")),
    onError: () => dispatch(setError("Error liking post")),
    onSettled: () => {},
  });

  const { mutate: recordLanguage } = useRecordLanguage({
    onSuccess: (data) => dispatch(setSuccess("Language captured successfully")),
    onError: (error) => dispatch(setError("Error capturing language")),
  });

  const { data } = useGetPost({
    postId: id,
    userId: user.id,
    isUpdating: isUpdating,
  });

  const handleCaptureLanguage = () => {
    recordLanguage({
      language: selectedText,
      postId: id,
      userId: user.id, // replace by actual user id
    });
  };

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
      <ScrollToTop />
      {/* Report Post Dialog */}
      <AlertDialogRoot open={openReportPost}>
        <AlertDialogPortal>
          <ReportDialog onClose={() => dispatch(setOpenReportPost(false))} />
        </AlertDialogPortal>
      </AlertDialogRoot>

      {/* Error Deleting Message */}
      <ResponseSnackbar
        open={error}
        autoHideDuration={3000}
        onClose={closeAlert}
        severity={"error"}
        message={message}
      />
      {/* Success Deleting Message */}
      <ResponseSnackbar
        open={success}
        autoHideDuration={3000}
        onClose={closeAlert}
        severity={"success"}
        message={message}
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
          <Button
            color="gray"
            onClick={() => dispatch(setOpenReportPost(true))}
          >
            Report
          </Button>
        </Box>
        <Box className="mb-8">
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
        </Box>
      </Container>
    </RootWrapper>
  );
}
