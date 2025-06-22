import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
function RootWrapper({ showHeader = true, children }) {
  return (
    <main className="w-full font-primary min-h-screen bg-dark-light">
      {showHeader && <Header />}
      <Outlet />
    </main>
  );
}

export default RootWrapper;
