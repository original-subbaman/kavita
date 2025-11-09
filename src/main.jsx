import { ThemeProvider } from "@mui/material";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import "./index.css";
import CreateRouter from "./router/Router";
import MuiTheme from "./utils/MuiTheme";
import { store } from "./store.js";
import Loading from "./components/Loading.jsx";
import { useAppTheme } from "./hooks/useAppTheme.js";
import { AppThemeProvider } from "./context/AppThemeProvider.jsx";
const queryClient = new QueryClient();

function AppWithDynamicTheme() {
  const { mode, accentColor } = useAppTheme();

  return (
    <ThemeProvider theme={MuiTheme}>
      <Theme appearance={mode} accentColor={accentColor}>
        <RouterProvider router={CreateRouter()} />
      </Theme>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Provider store={store}>
        <AppThemeProvider>
          <AuthProvider>
            <Suspense fallback={<Loading />}>
              <AppWithDynamicTheme />
            </Suspense>
          </AuthProvider>
        </AppThemeProvider>
      </Provider>
    </React.StrictMode>
  </QueryClientProvider>
);
