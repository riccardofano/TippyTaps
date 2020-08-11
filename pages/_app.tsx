import { AppProps } from "next/app";
import { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "../styles/global";
import { light, dark } from "../styles/themes";

export const ThemeToggle = createContext({} as { toggle: () => void });

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = (): void => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyles />
      <ThemeToggle.Provider value={{ toggle: toggleTheme }}>
        <Component {...pageProps} />
      </ThemeToggle.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
