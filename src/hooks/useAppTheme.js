import { ThemeContext } from "../context/AppThemeProvider.jsx";
import { useContext } from "react";

export function useAppTheme() {
  return useContext(ThemeContext);
}
