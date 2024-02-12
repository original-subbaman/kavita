import { Button, Box, Flex, Popover } from "@radix-ui/themes";
function Profile({ name }) {
  return (
    <Popover.Root>
      <div className="flex items-center gap-2 rounded cursor-pointer p-2">
        <p className="text-2xl">{name}</p>
        <Popover.Trigger>
          <Box
            color="green"
            height="7"
            width="7"
            className="rounded-full border-2 border-radix-green bg-radix-grass bg-opacity-30"
          ></Box>
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
