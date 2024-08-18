import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { RouterProvider } from "react-router-dom";
import CreateRouter from "./router/Router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Theme appearance="dark" accentColor="green">
        <RouterProvider router={CreateRouter()} />
      </Theme>
    </React.StrictMode>
  </QueryClientProvider>
);
