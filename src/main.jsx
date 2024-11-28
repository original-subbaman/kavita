import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { RouterProvider } from "react-router-dom";
import CreateRouter from "./router/Router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import MuiTheme from "./utils/MuiTheme";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ThemeProvider theme={MuiTheme}>
        <Theme appearance="dark" accentColor="green">
          <RouterProvider router={CreateRouter()} />
        </Theme>
      </ThemeProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
