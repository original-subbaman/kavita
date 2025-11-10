import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
function QuoteSearchBox({
  theme,
  handleSearchChange,
  size = "2",
  rootClass = "p-1",
}) {
  return (
    <div>
      <TextField.Root variant="soft" size={size} className={rootClass}>
        <TextField.Slot>
          <MagnifyingGlassIcon
            height="20"
            width="20"
            color={`${theme === "dark" ? "white" : "black"}`}
          />
        </TextField.Slot>
        <TextField.Input
          placeholder="Search for a quote"
          variant="soft"
          onChange={handleSearchChange}
          className={`${
            theme === "dark" ? "focus:text-white" : "focus:text-black"
          } placeholder:text-lg text-lg`}
        />
      </TextField.Root>
    </div>
  );
}

export default QuoteSearchBox;
