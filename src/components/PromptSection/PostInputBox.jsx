import { Pencil1Icon } from "@radix-ui/react-icons";

function PostInputBox({ onClick, theme = "dark" }) {
  return (
    <div
      className={`flex items-center gap-2 w-full rounded-xl 
        drop-shadow-sm
        p-2 ${
          theme === "dark"
            ? "bg-[#303030] text-white"
            : "bg-white border text-black"
        }`}
      onClick={onClick}
    >
      <Pencil1Icon
        className={`w-5 h-5 ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
      />
      <p className={`w-full font-primary text-lg text-gray-400`}>
        Write your own...
        <span className="animate-blink ml-1 w-2">|</span>
      </p>
    </div>
  );
}

export default PostInputBox;
