import { TextArea } from "@radix-ui/themes";

const CharLimitTextArea = ({
  text,
  setText,
  isAuthenticated,
  maxChars = 100,
}) => {
  const handleChange = (event) => {
    const input = event.target.value;
    if (input.length <= maxChars) {
      setText(input);
    }
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      <TextArea
        color="green"
        variant="soft"
        value={text}
        className="h-40"
        onChange={handleChange}
        placeholder={isAuthenticated ? "Add a comment..." : "Log in to comment"}
        disabled={!isAuthenticated}
      />

      <div
        className={`text-sm text-right ${
          text.length === maxChars ? "text-red-500" : "text-gray-500"
        }`}
      >
        {text.length}/{maxChars}
      </div>
    </div>
  );
};

export default CharLimitTextArea;
