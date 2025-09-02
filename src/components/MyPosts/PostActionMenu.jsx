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
      <Popover.Trigger>
        <IconButton variant="ghost" className="rounded-full">
          <DotsVerticalIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content
        align="end"
        sideOffset={4}
        className="w-32 rounded-md border-[1px] border-dark-light bg-dark-light  p-1 shadow-md "
      >
        {/* Visibility Toggle */}
        <Popover.Close className="w-full">
          <button
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
          </button>
        </Popover.Close>

        {/* Delete Post */}
        <Popover.Close className="w-full">
          <button
            className="flex items-center gap-2
          w-full rounded px-3 py-2 text-left 
          text-sm text-red-600 hover:bg-red-50 
          dark:hover:bg-red-900/30"
            onClick={handleDeletePost}
          >
            <TrashIcon />
            Delete
          </button>
        </Popover.Close>
        <Popover.Arrow className="fill-white dark:fill-gray-900" />
      </Popover.Content>
    </Popover.Root>
  );
}
