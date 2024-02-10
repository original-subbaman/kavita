import React from "react";
import getDateToday from "../../utils/Date";
import Profile from "./Profile";
function Header(props) {
  return (
    <header className="flex justify-between items-center bg-[#2D9596] h-20 px-8">
      <p className="text-4xl">{getDateToday()}</p>
      <h1 className="text-4xl text-center text-white">CWS</h1>
      <Profile name="John Doe" />
    </header>
  );
}

export default Header;
