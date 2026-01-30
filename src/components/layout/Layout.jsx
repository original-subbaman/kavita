
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export const Layout = ({  showFooter = true}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};
