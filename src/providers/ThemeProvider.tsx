import { useCallback, useEffect, useMemo, useState } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { createSafeContext } from "../utils/createSafeContext";

export const AVAILABLE_THEMES = [
  { name: "Light", value: "light" },
  { name: "Dark", value: "dark" },
];

export enum THEME {
  LIGHT = "light",
  DARK = "dark",
}

interface ThemeContextType {
  theme: THEME;
  changeTheme: (theme: THEME) => void;
}

const [useThemeContext, ThemeContextProvider] =
  createSafeContext<ThemeContextType>();

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [localStorageTheme, setLocalStorageTheme] = useLocalStorage(
    "theme",
    THEME.LIGHT as THEME,
  );
  const [theme, setTheme] = useState<THEME>(THEME.LIGHT);

  const changeTheme = useCallback(
    (theme: THEME) => {
      setLocalStorageTheme(theme);
      setTheme(theme);
    },
    [setLocalStorageTheme],
  );

  const getCurrentTheme = () => {
    if (
      localStorageTheme &&
      Object.values<string>(THEME).includes(localStorageTheme)
    ) {
      return localStorageTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? THEME.DARK
      : THEME.LIGHT;
  };

  useEffect(() => {
    const target = document.querySelector("html");

    if (theme === THEME.DARK) {
      target?.classList.add("dark");
    } else {
      target?.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  const value = useMemo(
    () => ({
      theme,
      changeTheme,
    }),
    [theme, changeTheme],
  );

  return <ThemeContextProvider value={value}>{children}</ThemeContextProvider>;
};

export { useThemeContext, ThemeProvider };
