import { Badge, IconButton } from "@mui/material";
import { Text } from "@radix-ui/themes";
import { IoIosNotifications } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import useGetNotificationCount from "../../hooks/notification/useGetNotificationCount";
import useAuth from "../../hooks/auth/useAuth";
import LinkText from "./LinkText";
import LoginButton from "./LoginButton";
import PopupMenu from "./PopupMenu";

function Header(props) {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const userName = user?.user_metadata?.name;

  const { data: count } = useGetNotificationCount(user?.id);

  return (
    <header className="flex justify-between text-white bg-ice-berg-dark items-center h-16 px-10 drop-shadow-md sticky top-0 z-[100]">
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
              <Badge badgeContent={count > 99 ? "99+" : count} color="success">
                <IoIosNotifications />
              </Badge>
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
