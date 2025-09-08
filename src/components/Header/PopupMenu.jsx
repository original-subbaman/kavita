import { Button, Box, Flex, Popover } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import useGetProfile from "../../hooks/user/useGetProfile";
import { getInitialsOfName } from "../../utils/Helper";

function PopupMenu({ name }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const { data: profile } = useGetProfile({ userId: user.id });

  const handleLogout = async () => {
    try {
      await logout();
      navigate(0);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const initials = getInitialsOfName(user.name);

  return (
    <Popover.Root>
      <div className="flex items-center gap-2 rounded cursor-pointer p-2">
        <p className="text-xl">{name}</p>
        <Popover.Trigger>
          {profile ? (
            <img
              src={profile}
              alt="Profile"
              className="rounded-full    "
              style={{ height: "32px", width: "32px", objectFit: "cover" }} // Adjust height/width as needed
            />
          ) : (
            <Box
              color="green"
              height="7"
              width="7"
              className="flex items-center 
              justify-center 
              rounded-full border-2 
              border-radix-green 
              bg-radix-grass bg-opacity-30"
            >
              {initials}
            </Box>
          )}
        </Popover.Trigger>
      </div>
      <Popover.Content>
        <Flex direction="column" gap="2">
          <Popover.Close>
            <Button variant="ghost" onClick={() => navigate("/profile")}>
              Profile
            </Button>
          </Popover.Close>
          <Popover.Close>
            <Button variant="ghost" onClick={handleLogout}>
              Log out
            </Button>
          </Popover.Close>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}

export default PopupMenu;
