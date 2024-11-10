import React, { useState } from "react";
import PopupMenu from "./PopupMenu";
import { Text } from "@radix-ui/themes";
import { NavLink, useLocation } from "react-router-dom";
import LinkText from "./LinkText";
function Header(props) {
  const location = useLocation();
  const [activePage, setActivePage] = useState();

  return (
    <header className="flex justify-between text-white bg-dark items-center h-16 px-8 drop-shadow-md sticky top-0 z-[100]">
      <Text size="6">CWS</Text>
      <nav className="flex gap-2">
        <NavLink to={"/"}>
          <LinkText isActive={location.pathname.includes("/home")}>
            Home
          </LinkText>
        </NavLink>
        <NavLink to={"/languagewall"}>
          <LinkText isActive={location.pathname.includes("/langaugewall")}>
            Language Wall
          </LinkText>
        </NavLink>
        <NavLink to={"/my-posts"}>
          <LinkText isActive={location.pathname.includes("/my-posts")}>
            My Posts
          </LinkText>
        </NavLink>
      </nav>
      <PopupMenu name="John Doe" />
    </header>
  );
}

export default Header;
