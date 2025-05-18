import {
  AlertDialog,
  Flex,
  RadioGroupRoot,
  RadioGroupItem,
  TextArea,
  Box,
  RadioGroup,
  Button,
} from "@radix-ui/themes";
import { forwardRef, useState } from "react";

const REPORT_POST_REASONS = [
  "Sexual Content",
  "Hateful or Abusive",
  "Harassment or Bullying",
  "Promotes Terrorism",
  "Explicit Language",
  "Other",
];

const ReportPostDialog = forwardRef(
  ({ postId, userId, onClose, onConfirm }, ref) => {
    const [reportReason, setReportReason] = useState();
    const [otherReason, setOtherReason] = useState("");
    const handleValueChange = (newValue) => setReportReason(newValue);
    return (
      <AlertDialog.Content ref={ref} maxwidth={"450px"}>
        <AlertDialog.Title>Report Post</AlertDialog.Title>
        <AlertDialog.Description>
          Reporting a post means you're blacklisting it.
        </AlertDialog.Description>
        <RadioGroupRoot
          value={reportReason}
          name="report_post_reasons"
          className="flex flex-col gap-4 text-white mt-4"
          onValueChange={handleValueChange}
        >
          {REPORT_POST_REASONS.map((reason) => (
            <Flex key={reason} align="center" gap="2" mb="1">
              <RadioGroup.Item value={reason} id={reason} />
              <label htmlFor={reason}>{reason}</label>
            </Flex>
          ))}
        </RadioGroupRoot>
        {reportReason === "Other" && (
          <Box mt="4">
            <label htmlFor="otherReason" className="mb-2">
              For reasons not mentioned in the list:
            </label>
            <TextArea
              id="otherReason"
              placeholder="Add other reasons here..."
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              rows={3}
            />
          </Box>
        )}
        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="solid"
            color="red"
            onClick={() => {
              onConfirm({
                postId: postId,
                userId: userId,
                reason: reportReason,
                additionalInfo: otherReason,
              });
              onClose();
            }}
          >
            Report Post
          </Button>
        </Flex>
      </AlertDialog.Content>
    );
  }
);

export default ReportPostDialog;
