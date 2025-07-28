import { Button, Box, Flex, Popover } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
function PopupMenu({ name }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      console.log("1st logged out");
      await logout();
      console.log("logged out");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error.message);
      // Handle error - maybe show a notification
    }
  };

  return (
    <Popover.Root>
      <div className="flex items-center gap-2 rounded cursor-pointer p-2">
        <p className="text-xl">{name}</p>
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
          <Button variant="ghost" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          <Button variant="ghost" onClick={handleLogout}>
            Log out
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}

export default PopupMenu;
