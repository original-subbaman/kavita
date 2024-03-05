import React from "react";
import Profile from "./Profile";
import { Text } from "@radix-ui/themes";
import { Link } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
function Header(props) {
  return (
    <header className="flex justify-between text-white bg-dark items-center h-16 px-8 drop-shadow-md sticky top-0 z-[100]">
      <Text size="6">CWS</Text>
      <nav className="flex gap-2">
        <NavLink to={"/"}>
          <Link className="hover:text-white duration-300 transition-all">
            Home
          </Link>
        </NavLink>
        <NavLink to={"/languagewall"}>
          <Link className="hover:text-white duration-300 transition-all">
            Language Wall
          </Link>
        </NavLink>
      </nav>
      <Profile name="John Doe" />
    </header>
  );
}

export default Header;
