import { Box, Flex } from "@radix-ui/themes";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import useGetProfile from "../../hooks/user/useGetProfile";
import { getInitialsOfName } from "../../utils/Helper";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "../ui/Popover";
import { Button } from "../ui/Button";

function PopupMenu({ name, theme }) {
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

  const initials = getInitialsOfName(name);

  return (
    <Popover className=" p-0">
      <div className={`flex items-center gap-2 rounded-md cursor-pointer p-2`}>
        <p className={`text-xl hidden lg:block`}>{name}</p>
        <PopoverTrigger>
          {profile ? (
            <img
              src={profile}
              alt="Profile"
              className="rounded-full"
              style={{ height: "32px", width: "32px", objectFit: "cover" }} // Adjust height/width as needed
            />
          ) : (
            <Box
              height="7"
              width="7"
              className="flex items-center 
              justify-center 
              rounded-full border-2 border-primary text-primary bg-white"
            >
              {initials}
            </Box>
          )}
        </PopoverTrigger>
      </div>
      <PopoverContent>
        <Flex direction="column" gap="2">
          <PopoverClose>
            <Button
              variant="ghost"
              className="hover:bg-accent py-1 px-2 rounded-md flex items-center justify-start gap-2"
              style={{ minWidth: 110 }}
              onClick={() => navigate("/profile")}
            >
              <User size={18} className="mr-1" />
              Profile
            </Button>
          </PopoverClose>
          <PopoverClose>
            <Button
              variant="ghost"
              className="hover:bg-accent py-1 px-2 rounded-md flex items-center justify-start gap-2"
              style={{ minWidth: 110 }}
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-1" />
              Log out
            </Button>
          </PopoverClose>
        </Flex>
      </PopoverContent>
    </Popover>
  );
}

export default PopupMenu;
