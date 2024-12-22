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
import { AuthProvider } from "./hooks/auth/AuthProvider.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ThemeProvider theme={MuiTheme}>
        <Theme appearance="dark" accentColor="green">
          <AuthProvider>
            <RouterProvider router={CreateRouter()} />
          </AuthProvider>
        </Theme>
      </ThemeProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
