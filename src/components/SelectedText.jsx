import { Button } from "@radix-ui/themes";
import { HeartIcon } from "@radix-ui/react-icons";
function SelectedText({ selectedText, captureLanguage }) {
  return (
    <div
      className="flex flex-col gap-2 md:gap-0 md:flex-row items-center  
      text-white
      bg-gray-500 bg-opacity-[0.2]
        mb-4 rounded-lg text-center py-2"
    >
      <span className="flex-1 md:text-[1rem]">
        {selectedText || "Highlight text to capture language"}
      </span>
      <Button
        onClick={captureLanguage}
        radius="full"
        disabled={!selectedText}
        className="text-white md:mr-2 bg-orange-500 hover:bg-orange-600 transition-colors duration-300"
      >
        <HeartIcon /> Capture
      </Button>
    </div>
  );
}

export default SelectedText;
