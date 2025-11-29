import { createContext, useContext } from "react";
import type { ThemeType } from "../../lib/type";

type ThemeContextType = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("This should not be use outside ThemeProvider");
  }
  return context;
}
