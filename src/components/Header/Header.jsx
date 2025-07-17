import { Button, Text } from "@radix-ui/themes";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import LinkText from "./LinkText";
import PopupMenu from "./PopupMenu";
import { IconButton } from "@mui/material";
import { IoIosNotifications } from "react-icons/io";
import LoginButton from "./LoginButton";
function Header(props) {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  console.log("🚀 ~ Header ~ user:", user);
  console.log("🚀 ~ Header ~ isAuthenticated:", isAuthenticated);
  const userName = user?.user_metadata?.name;

  return (
    <header className="flex justify-between text-white bg-dark items-center h-16 px-10 drop-shadow-md sticky top-0 z-[100]">
      <Text size="6">CWS</Text>
      {isAuthenticated && (
        <nav className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8">
          <NavLink to={"/"}>
            <LinkText isActive={location.pathname === "/"}>Home</LinkText>
          </NavLink>
          <NavLink to={"/inspiration"}>
            <LinkText isActive={location.pathname === "/inspiration"}>
              Inspiration
            </LinkText>
          </NavLink>
          <NavLink to={"/my-posts"}>
            <LinkText isActive={location.pathname === "/my-posts"}>
              My Posts
            </LinkText>
          </NavLink>
        </nav>
      )}
      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <NavLink to="/notifications">
            <IconButton sx={{ color: "white" }}>
              <IoIosNotifications />
            </IconButton>
          </NavLink>
          <PopupMenu name={userName} />
        </div>
      ) : (
        <LoginButton />
      )}
    </header>
  );
}

export default Header;
