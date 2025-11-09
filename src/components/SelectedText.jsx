import { Button } from "@radix-ui/themes";
import { HeartIcon } from "@radix-ui/react-icons";

function SelectedText({ selectedText, captureLanguage, theme }) {
  return (
    <div
      className={`flex flex-col gap-2 md:gap-0 md:flex-row items-center  
        ${
          theme === "dark"
            ? "bg-[#2e2b29] text-white"
            : "bg-white border border-gray-300 text-black"
        } 
        mb-4 rounded-lg text-center py-2`}
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
