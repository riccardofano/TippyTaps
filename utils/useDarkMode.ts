import { useState, useEffect } from "react";

export const useDarkMode = () => {
  const [theme, setTheme] = useState<string>("light");
  const toggle = (): void => {
    if (theme === "light") {
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  return { theme, toggle };
};
