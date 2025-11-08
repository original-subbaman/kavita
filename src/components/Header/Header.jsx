import { Badge, IconButton } from "@mui/material";
import {
  HamburgerMenuIcon,
  SunIcon,
  MoonIcon,
  BellIcon,
} from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { IoIosNotifications } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import quill from "../../assets/quill.png";
import useAuth from "../../hooks/auth/useAuth";
import useGetNotificationCount from "../../hooks/notification/useGetNotificationCount";
import { useAppTheme } from "../../hooks/useAppTheme";
import LinkText from "./LinkText";
import LoginButton from "./LoginButton";
import PopupMenu from "./PopupMenu";
import ToggleThemeButton from "../Common/ToggleThemeButton";

function NavLinks({ location }) {
  return (
    <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8">
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
  );
}

function UserMenu({ count, userName }) {
  return (
    <>
      <NavLink to="/notifications" className="h-8">
        <Button variant="soft" className="h-8">
          <Badge badgeContent={count > 99 ? "99+" : count} color="success">
            <BellIcon />
          </Badge>
        </Button>
      </NavLink>
      <div className="hidden md:block">
        <PopupMenu name={userName} />
      </div>
    </>
  );
}

function Header({ toggleSideNav, theme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleMode } = useAppTheme();
  const { user, isAuthenticated } = useAuth();
  const userName = user?.name;

  const { data: count } = useGetNotificationCount(user?.id, 0);

  return (
    <header
      className={`flex justify-between font-primary 
    text-white ${theme === "dark" ? "bg-dark-light" : "bg-white"} items-center 
    h-16 px-4 md:px-10 drop-shadow-md sticky 
    top-0 z-[100]`}
    >
      <Button
        variant="ghost"
        size="4"
        className="block md:hidden"
        onClick={toggleSideNav}
      >
        <HamburgerMenuIcon className="w-8 h-8" />
      </Button>

      <Button
        size="4"
        variant="ghost"
        className="hidden cursor-pointer hover:bg-transparent 
        hover:shadow-none md:flex md:items-center 
        md:gap-1 font-primary text-radix-green 
        text-2xl font-bold"
        onClick={() => navigate("/")}
      >
        Kavita
        <img src={quill} className="w-6 h-6" />
      </Button>

      {isAuthenticated ? (
        <>
          <NavLinks location={location} />
          <div className="flex items-center justify-center gap-2">
            <ToggleThemeButton mode={mode} toggleTheme={toggleMode} />
            <UserMenu count={count} userName={userName} />
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4 justify-center ">
          <ToggleThemeButton mode={mode} toggleTheme={toggleMode} />
          <LoginButton />
        </div>
      )}
    </header>
  );
}

export default Header;
