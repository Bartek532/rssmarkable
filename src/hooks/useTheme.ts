import { useEffect } from "react";

import { useLocalStorage } from "./useLocalStorage";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<"true" | "false">(
    "isDarkMode",
    "false",
  );

  const toggleTheme = () => {
    setIsDarkMode(isDarkMode === "true" ? "false" : "true");

    document.body.setAttribute(
      "data-dark-mode",
      isDarkMode === "true" ? "false" : "true",
    );
  };

  useEffect(() => {
    if (isDarkMode === "true") {
      document.body.setAttribute("data-dark-mode", "true");
    }
  }, [isDarkMode]);

  const isDarkModeEnabled = isDarkMode === "true";

  return { isDarkModeEnabled, toggleTheme };
};
