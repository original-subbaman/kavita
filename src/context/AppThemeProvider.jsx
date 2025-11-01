import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function AppThemeProvider({ children }) {
  const [mode, setMode] = useState(
    () => localStorage.getItem("themeMode") || "dark"
  );
  const [accentColor, setAccentColor] = useState(
    () => localStorage.getItem("accentColor") || "green"
  );

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("accentColor", accentColor);
  }, [accentColor]);

  const toggleMode = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider
      value={{ mode, setMode, toggleMode, accentColor, setAccentColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
