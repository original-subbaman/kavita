import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  AlertDialog,
  Flex,
  Button,
  RadioGroup,
  TextArea,
  Box,
} from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";

const reportReasons = [
  "Spam or Advertising",
  "Hate Speech or Abusive Language",
  "Harassment or Bullying",
  "False Information / Misinformation",
  "Off-topic",
  "Sexually Explicit Content",
  "Violent or Graphic Content",
  "Self-Harm or Suicide Concern",
  "Other",
];

const ReportCommentDialog = ({ onClose, onReport }) => {
  const { id: postId } = useParams();
  const { user } = useAuth();
  const commentId = useSelector((state) => {
    return state.postDetail.commentId;
  });
  const [selectedReason, setSelectedReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleReport = () => {
    if (!selectedReason) {
      alert("Please select a reason.");
      return;
    }
    onReport({
      postId: postId,
      commentId: commentId,
      userId: user.id,
      reason: selectedReason,
      additionalInfo,
    });
    onClose();
  };

  return (
    <AlertDialog.Content maxWidth="450px">
      <AlertDialog.Title>Report Comment</AlertDialog.Title>
      <AlertDialog.Description>
        Reporting a comment means you're blacklisting it. Please select a reason
        below.
      </AlertDialog.Description>

      <Box mt="3">
        <RadioGroup.Root
          value={selectedReason}
          onValueChange={setSelectedReason}
        >
          {reportReasons.map((reason) => (
            <Flex key={reason} align="center" gap="2" mb="2">
              <RadioGroup.Item value={reason} id={reason} />
              <label htmlFor={reason}>{reason}</label>
            </Flex>
          ))}
        </RadioGroup.Root>
      </Box>

      <Box mt="4">
        <label htmlFor="additionalInfo">
          Additional Information (optional)
        </label>
        <TextArea
          id="additionalInfo"
          placeholder="Add more details here..."
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          rows={3}
        />
      </Box>

      <Flex gap="3" mt="4" justify="end">
        <Button variant="soft" color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="solid" color="red" onClick={handleReport}>
          Report
        </Button>
      </Flex>
    </AlertDialog.Content>
  );
};

export default ReportCommentDialog;
