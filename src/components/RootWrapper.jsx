import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import useAuth from "../hooks/auth/useAuth";
import { useState } from "react";
import MobileNav from "./Header/MobileNav";
import { Footprints } from "lucide-react";
import Footer from "./Footer/Footer";
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
      <main className="w-full font-primary min-h-[100dvh] bg-dark-light">
        <Outlet />
        {children}
      </main>
      <Footer />
    </>
  );
}

export default RootWrapper;
