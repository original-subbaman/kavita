import React from "react";
import getDateToday from "../../utils/Date";
import Profile from "./Profile";
function Header(props) {
  return (
    <header className="flex justify-between text-white bg-dark items-center h-16 px-8 border-b border-slate-300">
      <h1 className="text-2xl text-center ">CWS</h1>
      <Profile name="John Doe" />
    </header>
  );
}

export default Header;
