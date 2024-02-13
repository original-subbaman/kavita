import React from "react";
import Profile from "./Profile";
import { Text } from "@radix-ui/themes";
function Header(props) {
  return (
    <header className="flex justify-between text-white bg-dark items-center h-16 px-8 drop-shadow-md">
      <Text size="6">CWS</Text>
      <Profile name="John Doe" />
    </header>
  );
}

export default Header;
