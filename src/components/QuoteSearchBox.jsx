import React from "react";
import { Container, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
function QuoteSearchBox({handleSearchChange}) {
  return (
    <div>
      <TextField.Root variant="soft" size={"3"} className="p-2">
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
