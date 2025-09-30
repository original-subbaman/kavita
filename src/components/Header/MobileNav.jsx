import React from "react";
import { Button, Box, Flex, Text, Quote } from "@radix-ui/themes";
import { NavLink, useLocation } from "react-router-dom";
import {
  BookmarkFilledIcon,
  ExitIcon,
  HomeIcon,
  PersonIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import useAuth from "../../hooks/auth/useAuth";
import quill from "../../assets/quill.png";
import useGetProfile from "../../hooks/user/useGetProfile";
import { AnimatePresence, motion } from "framer-motion";
import { getInitialsOfName } from "../../utils/Helper";

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

const sideNavVariants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      when: "beforeChildren",
    },
  },
  exit: {
    x: "-100%",
    transition: {
      type: "tween",
      duration: 0.3,
      when: "afterChildren",
    },
  },
};

const container = {
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

function MobileNav({ openSideNav, onClose }) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { data: profile } = useGetProfile({ userId: user.id });
  const initials = getInitialsOfName(user.name);

  return (
    <AnimatePresence>
      {openSideNav && (
        // Use a fragment so AnimatePresence receives multiple keyed children
        <React.Fragment key="sideNavFragment">
          {/* Backdrop — animate opacity so it fades out */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Side nav */}
          <motion.div
            key="sidenav"
            variants={sideNavVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 h-full w-64 bg-aurora z-[100]"
          >
            <Flex direction="column" className="h-full w-full gap-4">
              <Box className="flex items-center justify-start text-radix-green h-10 px-3">
                <Text size={"4"} className="mt-[18px] flex items-center gap-1">
                  Kavita
                  <img src={quill} className="w-6 h-6" />
                </Text>
              </Box>

              <Box className="flex items-center justify-start gap-3 border-y-[1px] border-gray-400  w-full h-[6rem] px-3">
                {profile ? (
                  <img
                    src={profile}
                    alt="Profile"
                    className="rounded-full"
                    style={{ height: 32, width: 32, objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    color="green"
                    height="7"
                    width="7"
                    className="flex items-center justify-center rounded-full border-2 border-radix-green bg-radix-grass bg-opacity-30"
                  >
                    {initials}
                  </Box>
                )}

                <div className="flex flex-col items-start gap-0 text-white">
                  <Text>{user.name}</Text>
                  <Text size={"2"} color="grass">
                    {user.user_name}
                  </Text>
                </div>
              </Box>

              {/* Nav items container: it controls staggered children */}
              <motion.div
                className="flex-1 flex flex-col items-start h-full px-3 gap-4"
                variants={container}
                initial="hidden"
                animate="visible"
                exit="hidden" // ensure children animate to "hidden" when exiting
              >
                {navItems.map(({ to, label, icon }) => (
                  <motion.div key={to} variants={item} className="w-full">
                    <NavItem
                      to={to}
                      label={label}
                      icon={icon}
                      isActive={pathname === to}
                      onClose={onClose}
                    />
                  </motion.div>
                ))}
              </motion.div>

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
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}

export default MobileNav;
