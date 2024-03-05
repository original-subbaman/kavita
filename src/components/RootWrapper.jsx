import React from "react";
import Header from "./Header/Header";

function RootWrapper({ children }) {
  return (
    <main className="w-full min-h-screen bg-dark-light">
      <Header />
      {children}
    </main>
  );
}

export default RootWrapper;
