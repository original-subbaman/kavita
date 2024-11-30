import React from "react";
import { Container, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
function QuoteSearchBox({ handleSearchChange, size = "3", rootClass = "p-2" }) {
  return (
    <div>
      <TextField.Root variant="soft" size={size} className={rootClass}>
        <TextField.Slot>
          <MagnifyingGlassIcon height="20" width="20" color="white" />
        </TextField.Slot>
        <TextField.Input
          placeholder="Search for a quote"
          variant="soft"
          onChange={handleSearchChange}
          className="focus:text-white  placeholder:italic placeholder:text-lg text-lg"
        />
      </TextField.Root>
    </div>
  );
}

export default QuoteSearchBox;
