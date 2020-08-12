import { AppProps } from "next/app";
import { createContext, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "../styles/global";
import { light, dark } from "../styles/themes";
import { useDarkMode } from "../utils/useDarkMode";

export const ThemeToggle = createContext(
  {} as { toggle: () => void; theme: string }
);

function MyApp({ Component, pageProps }: AppProps) {
  const { theme, toggle } = useDarkMode();

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyles />
      <ThemeToggle.Provider value={{ toggle, theme }}>
        <Component {...pageProps} />
      </ThemeToggle.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
