import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { RouterProvider } from "react-router-dom";
import CreateRouter from "./router/Router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme appearance="dark" accentColor="green">
      <RouterProvider router={CreateRouter()} />
    </Theme>
  </React.StrictMode>
);
