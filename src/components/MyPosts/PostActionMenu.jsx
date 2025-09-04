import * as Popover from "@radix-ui/react-popover";
import { Button, IconButton } from "@radix-ui/themes";
import {
  DotsVerticalIcon,
  EyeNoneIcon,
  EyeOpenIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

export function PostActionMenu({
  isHidden = false,
  handleHidePost,
  handleDeletePost,
}) {
  return (
    <Popover.Root>
      <Popover.Trigger className="rounded-full hover:bg-radix-green/50 p-2">
        <DotsVerticalIcon />
      </Popover.Trigger>
      <Popover.Content
        align="end"
        sideOffset={4}
        className="w-32 rounded-md border-[1px] border-dark-light bg-dark-light  p-1 shadow-md "
      >
        {/* Visibility Toggle */}
        <Popover.Close className="w-full">
          <div
            variant="ghost"
            className="flex items-center gap-2 
          w-full rounded px-3 py-2 
          text-left text-sm hover:bg-[#16261b]"
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

        {/* Delete Post */}
        <Popover.Close className="w-full">
          <div
            className="flex items-center gap-2
          w-full rounded px-3 py-2 text-left 
          text-sm text-red-600 hover:bg-red-50 
          dark:hover:bg-red-900/30"
            onClick={handleDeletePost}
          >
            <TrashIcon />
            Delete
          </div>
        </Popover.Close>
        <Popover.Arrow className="fill-white dark:fill-gray-900" />
      </Popover.Content>
    </Popover.Root>
  );
}
