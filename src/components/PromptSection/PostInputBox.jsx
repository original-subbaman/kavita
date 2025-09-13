import { Pencil1Icon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
function PostInputBox({ onClick }) {
  return (
    <TextField.Root
      size={{ xs: "1", md: "2" }}
      variant="soft"
      className="w-full bg-[#303030] rounded-lg text-white p-2  "
      onClick={onClick}
    >
      <TextField.Slot className="mr-2 md:mr-0">
        <Pencil1Icon className="w-5 h-5 text-white" />
      </TextField.Slot>
      <TextField.Input
        placeholder="Write your own..."
        className="w-full bg-transparent text-white placeholder:text-gray-400 font-primary text-lg"
      />
    </TextField.Root>
  );
}

export default PostInputBox;
