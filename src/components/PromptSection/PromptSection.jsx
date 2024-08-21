import React, { useState } from "react";
import PromptTextField from "./PromptTextField";
import { AlertDialog } from "@radix-ui/themes";

import PromptText from "./PromptText";
function PromptSection(props) {
  const [addPostDialog, setAddPostDialog] = useState(false);
  return (
    <AlertDialog.Root open={addPostDialog} onOpenChange={setAddPostDialog}>
      <div className="flex flex-col items-center my-8 gap-2">
        <PromptText />
        <PromptTextField closeAlert={() => setAddPostDialog(false)} />
      </div>
    </AlertDialog.Root>
  );
}

export default PromptSection;
