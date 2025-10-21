import { useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import MobileNav from "./Header/MobileNav";
function RootWrapper({ showHeader = true, children }) {
  const { isAuthenticated } = useAuth();
  const [openSideNav, setOpenSideNav] = useState(false);

  return (
    <>
      {showHeader && (
        <Header toggleSideNav={() => setOpenSideNav((prev) => !prev)} />
      )}
      {isAuthenticated && (
        <MobileNav
          openSideNav={openSideNav}
          onClose={() => setOpenSideNav(false)}
        />
      )}
      <main className="w-full font-primary min-h-[100dvh] bg-dark-light overflow-hidden">
        <Outlet />
        {children}
      </main>
      <Footer />
    </>
  );
}

export default RootWrapper;
