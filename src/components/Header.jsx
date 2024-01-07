import React from "react";

function Header(props) {
  function getDateToday() {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const year = currentDate.getFullYear();
    const formattedDate = `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
    return formattedDate;
  }
  return (
    <header className="flex justify-between items-center font-primary bg-[#2D9596] h-20 px-8 text-white">
      <p className="text-4xl">{getDateToday()}</p>
      <h1 className="text-4xl text-center">Creative Writing Sikkim</h1>
      <div className="flex items-center gap-2 hover:bg-gray-400 rounded cursor-pointer p-2 duration-300">
        <button
          className="rounded-full border-4 border-gray-400 bg-white w-14 h-14"
          onClick={() => {}}
        ></button>
        <p className="text-3xl">John Doe</p>
      </div>
    </header>
  );
}

export default Header;
