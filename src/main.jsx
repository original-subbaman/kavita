import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LanguageWall from "./pages/LanguageWall.jsx";
import Home from "./pages/Home.jsx";
import PostDetail from "./pages/PostDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/post/:id", 
    element: <PostDetail />
  }, 
  {
    path: "/languagewall",
    element: <LanguageWall />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme appearance="dark" accentColor="green">
      <RouterProvider router={router} />
    </Theme>
  </React.StrictMode>
);
