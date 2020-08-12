import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "../utils/types";

import { GlobalStyles } from "../styles/global";
import { light, dark } from "../styles/themes";
import { useDarkMode } from "../utils/useDarkMode";

function MyApp({ Component, pageProps }: AppProps) {
  const { theme, toggle } = useDarkMode();

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyles />
      <ThemeContext.Provider value={{ toggle, theme }}>
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
