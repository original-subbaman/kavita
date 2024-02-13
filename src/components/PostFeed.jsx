import React from "react";
import PromptTextField from "./PromptTextField";
import { AlertDialog } from "@radix-ui/themes";

function PostFeed(props) {
  return (
    <AlertDialog.Root>
      <div className="flex flex-col items-center">
        <PromptTextField />
      </div>
    </AlertDialog.Root>
  );
}

export default PostFeed;
