import { AppThemeProvider } from "../../context/AppThemeProvider";
import { ThemeProvider } from "@mui/material";
import { Theme } from "@radix-ui/themes";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AuthContext } from "../../context/AuthContext";
import Login from "../../pages/Login";
import MuiTheme from "../../utils/MuiTheme";

HTMLCanvasElement.prototype.getContext = () => {
  return {
    set fillStyle(value) {
      // do nothing
    },
    get fillStyle() {
      return null;
    },
    // Add other properties/methods as needed
  };
};

describe("Login Page", () => {
  // Mock AuthProvider to always set loading to false
  function MockAuthProvider({ children }) {
    const mockAuth = {
      user: null,
      loading: false,
      login: () => {},
      logout: () => {},
      session: null,
      isAuthenticated: false,
    };
    return (
      <AuthContext.Provider value={mockAuth}>{children}</AuthContext.Provider>
    );
  }

  it("renders email and password fields", () => {
    render(
      <MemoryRouter>
        <AppThemeProvider>
          <ThemeProvider theme={MuiTheme}>
            <MockAuthProvider>
              <Theme>
                <Login />
              </Theme>
            </MockAuthProvider>
          </ThemeProvider>
        </AppThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Enter Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
    expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
    expect(screen.getByText("New to Kavita?")).toBeInTheDocument();
    expect(screen.getByText("Register here")).toBeInTheDocument();
  });
});
