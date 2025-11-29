import { useState } from "react";
import type { ThemeType } from "../../lib/type";
import { ThemeContext } from "./ThemeContext";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<ThemeType>("dark");

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
