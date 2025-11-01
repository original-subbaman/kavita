import { useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import MobileNav from "./Header/MobileNav";
import { useAppTheme } from "../hooks/useAppTheme";
function RootWrapper({ showHeader = true, children }) {
  const { isAuthenticated } = useAuth();
  const { mode } = useAppTheme();
  const [openSideNav, setOpenSideNav] = useState(false);

  return (
    <>
      {showHeader && (
        <Header
          theme={mode}
          toggleSideNav={() => setOpenSideNav((prev) => !prev)}
        />
      )}
      {isAuthenticated && (
        <MobileNav
          openSideNav={openSideNav}
          onClose={() => setOpenSideNav(false)}
        />
      )}
      <main
        className={`w-full font-primary min-h-[100dvh] ${
          mode === "dark" ? "bg-dark-light color-white" : "bg-white color-black"
        } overflow-hidden`}
      >
        <Outlet />
        {children}
      </main>
      <Footer />
    </>
  );
}

export default RootWrapper;
