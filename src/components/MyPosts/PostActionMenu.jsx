import * as Popover from "@radix-ui/react-popover";
import { Button, IconButton } from "@radix-ui/themes";
import {
  DotsVerticalIcon,
  EyeNoneIcon,
  EyeOpenIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

export function PostActionMenu({
  isHidden = false,
  handleHidePost,
  handleEditPost,
  handleDeletePost,
  mode = "dark", // add mode prop
}) {
  const isDark = mode === "dark";
  return (
    <Popover.Root>
      <Popover.Trigger
        className={`rounded-full p-2 ${
          isDark ? "hover:bg-radix-green/50" : "hover:bg-gray-200"
        }`}
      >
        <DotsVerticalIcon />
      </Popover.Trigger>
      <Popover.Content
        align="end"
        sideOffset={4}
        className={`w-32 rounded-md border-[1px] p-1 shadow-md ${
          isDark
            ? "border-dark-light bg-dark-light"
            : "border-gray-200 bg-white"
        }`}
      >
        {/* Visibility Toggle */}
        <Popover.Close className="w-full">
          <div
            variant="ghost"
            className={`flex items-center gap-2 w-full rounded px-3 py-2 text-left text-sm ${
              isDark
                ? "hover:bg-[#16261b] text-white"
                : "hover:bg-gray-100 text-gray-900"
            }`}
            onClick={handleHidePost}
          >
            {isHidden ? (
              <>
                <EyeOpenIcon />
                Show
              </>
            ) : (
              <>
                <EyeNoneIcon />
                Hide
              </>
            )}
          </div>
        </Popover.Close>

        {/* Edit Post */}
        <Popover.Close className="w-full">
          <div
            variant="ghost"
            className={`flex items-center gap-2 w-full rounded px-3 py-2 text-left text-sm ${
              isDark
                ? "hover:bg-[#16261b] text-white"
                : "hover:bg-gray-100 text-gray-900"
            }`}
            onClick={handleEditPost}
          >
            <Pencil1Icon />
            Edit
          </div>
        </Popover.Close>

        {/* Delete Post */}
        <Popover.Close className="w-full">
          <div
            className={`flex items-center gap-2 w-full rounded px-3 py-2 text-left text-sm text-red-600 ${
              isDark ? "hover:bg-red-900/30" : "hover:bg-red-50"
            }`}
            onClick={handleDeletePost}
          >
            <TrashIcon />
            Delete
          </div>
        </Popover.Close>
        <Popover.Arrow
          className={isDark ? "fill-white dark:fill-gray-900" : "fill-gray-200"}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
