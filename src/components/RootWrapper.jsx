import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
function RootWrapper({ showHeader = true, children }) {
  return (
    <main className="w-full font-primary min-h-screen bg-dark-light">
      {showHeader && <Header />}
      <Outlet />
      {children}
    </main>
  );
}

export default RootWrapper;
