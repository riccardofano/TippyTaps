import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "../utils/types";

import { GlobalStyles } from "../styles/global";
import { light, dark } from "../styles/themes";
import { useDarkMode } from "../utils/useDarkMode";

import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
