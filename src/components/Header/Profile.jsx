import { useState } from "react";
import { Button, Flex, Popover } from "@radix-ui/themes";
function Profile({ name }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  return (
    <Popover.Root>
      <div className="flex items-center gap-2 rounded cursor-pointer p-2">
        <p className="text-3xl">{name}</p>
        <Popover.Trigger>
          <button
            className="rounded-full border-4 border-white w-12 h-12"
            onClick={handleClick}
          ></button>
        </Popover.Trigger>
      </div>
      <Popover.Content>
        <Flex direction="column" gap="2">
          <Button variant="ghost">Profile</Button>
          <Button variant="ghost">Log out</Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}

export default Profile;
