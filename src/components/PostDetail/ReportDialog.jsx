import {
  AlertDialog,
  Flex,
  RadioGroupRoot,
  RadioGroupItem,
  TextField,
  Button,
} from "@radix-ui/themes";
import { useState } from "react";

const ReportDialog = ({ title, description }) => {
  const [reportReason, setReportReason] = useState();
  const handleValueChange = (newValue) => setReportReason(newValue);
  return (
    <AlertDialog.Content maxWidth={"450px"}>
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
        <Flex align={"center"} justify={"start"}>
          <RadioGroupItem value="sexual_content" />
          <span className="ml-4">Sexual Content</span>
        </Flex>
        <RadioGroupItem value="hateful_or_abusive">
          Hateful or abusive
        </RadioGroupItem>
        <RadioGroupItem value="harrasment">
          Harassment or bullying
        </RadioGroupItem>
        <RadioGroupItem value="promotes_terrorism">
          Promotes terrorism
        </RadioGroupItem>
        <RadioGroupItem value="explicit_language">
          Explicit language
        </RadioGroupItem>
        <RadioGroupItem value="other">Other</RadioGroupItem>
      </RadioGroupRoot>
      {reportReason == "other" && <TextField></TextField>}
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button variant="solid" color="red">
            Revoke access
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  );
};

export default ReportDialog;
