import { ThemeProvider } from "@mui/material";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import "./index.css";
import CreateRouter from "./router/Router";
import MuiTheme from "./utils/MuiTheme";
import { store } from "./store.js";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={MuiTheme}>
          <Theme appearance="dark" accentColor="green">
            <AuthProvider>
              <RouterProvider router={CreateRouter()} />
            </AuthProvider>
          </Theme>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  </QueryClientProvider>
);
