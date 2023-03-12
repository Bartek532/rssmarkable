import { createContext } from "react";

import { useTheme } from "../hooks/useTheme";

interface ThemeContextType {
  isDarkModeEnabled: boolean;
  toggleTheme: () => void;
}

export const themeContext = createContext<ThemeContextType>({
  isDarkModeEnabled: false,
  toggleTheme: () => undefined,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { isDarkModeEnabled, toggleTheme } = useTheme();

  return (
    <themeContext.Provider value={{ isDarkModeEnabled, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};
