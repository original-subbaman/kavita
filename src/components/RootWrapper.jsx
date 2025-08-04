import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import useAuth from "../hooks/auth/useAuth";
import { useState } from "react";
import MobileNav from "./Header/MobileNav";
function RootWrapper({ showHeader = true, children }) {
  const { user, isAuthenticated } = useAuth();
  const [openSideNav, setOpenSideNav] = useState(false);

  return (
    <main className="w-full font-primary min-h-screen bg-aurora">
      {showHeader && (
        <Header toggleSideNav={() => setOpenSideNav((prev) => !prev)} />
      )}
      {isAuthenticated && openSideNav && (
        <MobileNav
          openSideNav={openSideNav}
          onClose={() => setOpenSideNav(false)}
        />
      )}
      <Outlet />
      {children}
    </main>
  );
}

export default RootWrapper;
