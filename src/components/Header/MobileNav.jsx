import React from "react";
import { Button, Box, Flex, Text, Quote } from "@radix-ui/themes";
import { NavLink, useLocation } from "react-router-dom";
import LinkText from "./LinkText";
import {
  BookmarkFilledIcon,
  ExitIcon,
  HomeIcon,
  PersonIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { Typography } from "@mui/material";
import PopupMenu from "./PopupMenu";
import useAuth from "../../hooks/auth/useAuth";

const NavItem = ({
  to,
  icon,
  label,
  isActive = false,
  size = "4",
  onClose,
}) => {
  return (
    <NavLink
      to={to}
      className={`flex items-center gap-2 w-full h-10  ${
        isActive ? "bg-radix-grass rounded-md px-2" : ""
      }`}
      onClick={onClose}
    >
      {React.cloneElement(icon, {
        className: `${icon.props.className ?? ""} ${
          isActive ? "text-white font-semibold" : "text-radix-green"
        }`,
      })}
      <Text
        size={size}
        className={`${
          isActive ? "text-white font-semibold" : "text-[#30a46c]"
        }`}
      >
        {label}
      </Text>
    </NavLink>
  );
};
const navIconStyle = "w-[20px] h-[20px] ";
const navItems = [
  {
    to: "/",
    label: "Home",
    icon: <HomeIcon className={navIconStyle} />,
  },
  {
    to: "/inspiration",
    label: "Inspiration",
    icon: <BookmarkFilledIcon className={navIconStyle} />,
  },
  {
    to: "/my-posts",
    label: "My Posts",
    icon: <ReaderIcon className={navIconStyle} />,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: <PersonIcon className={navIconStyle} />,
  },
];

function MobileNav({ openSideNav, onClose }) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  return (
    <>
      {/* Backdrop */}
      {openSideNav && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      )}
      <Flex
        direction="column"
        className={`fixed top-0 left-0 h-full w-64 bg-aurora z-[100] 
           gap-4 transition-transform duration-300 ${
             openSideNav ? "translate-x-0" : "-translate-x-full"
           }`}
      >
        <Box className="flex items-center justify-start text-radix-green h-10 px-3 ">
          <Text size={"4"} className="mt-[18px]">
            CWS
          </Text>
        </Box>
        <Box className="flex items-center justify-start gap-3 border-y-[1px] border-gray-400  w-full h-[6rem] px-3">
          <Box
            color="green"
            height="7"
            width="7"
            className="rounded-full border-2 border-radix-green bg-radix-grass bg-opacity-30"
          ></Box>
          <div className="flex flex-col items-start gap-0 text-white">
            <Text>{user.name}</Text>
            <Text size={"2"} color="grass">
              {user.user_name}
            </Text>
          </div>
        </Box>
        <Box className="flex-1 flex flex-col items-start h-full  px-3 gap-4">
          {navItems.map(({ to, label, icon }) => (
            <NavItem
              to={to}
              label={label}
              icon={icon}
              isActive={pathname === to}
              onClose={onClose}
            />
          ))}
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
