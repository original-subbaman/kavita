import { Badge, useMediaQuery } from "@mui/material";
import { BellIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import quill from "../../assets/quill.png";
import useAuth from "../../hooks/auth/useAuth";
import useGetNotificationCount from "../../hooks/notification/useGetNotificationCount";
import { useAppTheme } from "../../hooks/useAppTheme";
import { Link } from "react-router-dom";
import { PrayerFlags } from "../ui/PrayerFlags";
import { PenLine, User, Bookmark, Home, Menu, X } from "lucide-react";
import ToggleThemeButton from "../Common/ToggleThemeButton";
import LinkText from "../Header/LinkText";
import LoginButton from "../Header/LoginButton";
import PopupMenu from "../Header/PopupMenu";
import { useState } from "react";
import { cn } from "../../utils/Helper";

function Header({ toggleSideNav, theme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleMode } = useAppTheme();
  const { user, isAuthenticated } = useAuth();
  const userName = user?.full_name;
  const isMobile = useMediaQuery("(max-width:600px)");

  const { data: count } = useGetNotificationCount(user?.id, 0);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/posts/new", label: "Write", icon: PenLine },
    { path: "/inspiration", label: "Language Wall", icon: Bookmark },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <PrayerFlags size="sm" />
            <span className="font-display text-2xl font-semibold text-primary">
              कविता
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive(link.path) ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2 transition-all px-3 py-2 hover:rounded-md hover:bg-accent text-black ",
                    isActive(link.path) &&
                      "bg-secondary text-primary font-medium rounded-md",
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary rounded-md hover:bg-accent px-3 py-1 transition-colors duration-300"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="sm"
                className="bg-primary px-3 py-1 hover:bg-primary/90 rounded-md text-primary-foreground"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive(link.path) ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Button>
                </Link>
              ))}
              <div className="flex gap-2 pt-4 border-t border-border mt-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

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

function GoHomeButton({ navigate }) {
  return (
    <Button
      size="4"
      variant="ghost"
      className="cursor-pointer hover:bg-transparent 
        hover:shadow-none md:flex md:items-center 
        md:gap-1 font-primary text-radix-green 
        text-2xl font-bold"
      onClick={() => navigate("/")}
    >
      Kavita
      <img src={quill} className="w-6 h-6" />
    </Button>
  );
}
export default Header;
