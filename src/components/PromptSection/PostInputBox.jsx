import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
function PostInputBox({ onClick }) {
  return (
    <AlertDialogTrigger asChild>
      <TextField.Root
        size={"2"}
        variant="soft"
        className="w-full bg-[#303030] rounded-lg p-2  text-white"
        onClick={onClick}
      >
        <TextField.Slot>
          <Pencil1Icon className="w-5 h-5 text-white" />
        </TextField.Slot>
        <TextField.Input
          placeholder="Write your own..."
          className="w-full bg-transparent text-white placeholder:text-gray-400 font-primary text-lg"
        />
      </TextField.Root>
    </AlertDialogTrigger>
  );
}

export default PostInputBox;
