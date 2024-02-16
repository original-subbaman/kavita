import React from "react";

function RootWrapper({ children }) {
  return <main className="w-full min-h-screen bg-dark-light">{children}</main>;
}

export default RootWrapper;
