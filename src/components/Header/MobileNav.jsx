import { Button, Box, Flex, Text } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
import LinkText from "./LinkText";
import { ExitIcon, HomeIcon } from "@radix-ui/react-icons";

function MobileNav({ openSideNav, onClose }) {
  return (
    <>
      {/* Backdrop */}
      {openSideNav && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      )}
      <Flex
        direction="column"
        className={`fixed top-0 left-0 h-full w-64 bg-white z-[100] 
           gap-4 transition-transform duration-300 ${
             openSideNav ? "translate-x-0" : "-translate-x-full"
           }`}
      >
        <Box className="bg-black w-full h-[10rem]">
          <Text>Name</Text>
        </Box>
        <Box className="flex-1 flex flex-col items-start h-full bg-blue-50 px-2 gap-4">
          <NavLink to={"/"} className="flex items-center gap-2">
            <HomeIcon fontSize="1rem" />
            <LinkText size="4">Home</LinkText>
          </NavLink>
          <NavLink to={"/inspiration"}>
            <LinkText size="4">Inspiration</LinkText>
          </NavLink>
          <NavLink to={"/my-posts"}>
            <LinkText size="4">My Posts</LinkText>
          </NavLink>
          <NavLink to={"/my-posts"}>
            <LinkText size="4">Profile</LinkText>
          </NavLink>
        </Box>
        <Box className="p-4 border-t-[1px] border-gray-400">
          <Button
            variant="ghost"
            color="primary"
            className="flex items-center gap-2 font-bold"
          >
            <ExitIcon />
            Log out
          </Button>
        </Box>
      </Flex>
    </>
  );
}

export default MobileNav;
