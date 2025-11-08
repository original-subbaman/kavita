import { Pencil1Icon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
function PostInputBox({ onClick, theme = "dark" }) {
  return (
    <TextField.Root
      size={{ xs: "1", md: "2" }}
      variant="soft"
      className={`w-full rounded-lg p-2 ${
        theme === "dark"
          ? "bg-[#303030] text-white"
          : "bg-white border border-gray-300 text-black"
      }`}
      onClick={onClick}
    >
      <TextField.Slot className="mr-2 md:mr-0">
        <Pencil1Icon className="w-5 h-5 text-gray-500" />
      </TextField.Slot>
      <TextField.Input
        placeholder="Write your own..."
        className={`w-full bg-transparent  font-primary text-lg ${
          theme === "dark" ? "placeholder:text-gray-400" : "text-black"
        }`}
      />
    </TextField.Root>
  );
}

export default PostInputBox;
