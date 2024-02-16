import React from "react";
import PromptTextField from "./PromptTextField";
import { AlertDialog } from "@radix-ui/themes";

import PromptText from "./PromptText";
function PromptSection(props) {
  return (
    <AlertDialog.Root>
      <div className="flex flex-col items-center my-8 gap-2">
        <PromptText />
        <PromptTextField />
      </div>
    </AlertDialog.Root>
  );
}

export default PromptSection;
