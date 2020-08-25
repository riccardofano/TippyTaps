import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: "Rubik";
    font-weight: 400;
    src: url("/fonts/Rubik-Regular.ttf");
    font-display: fallback;
  }

  @font-face {
    font-family: "Rubik";
    font-weight: 700;
    src: url("/fonts/Rubik-Bold.ttf");
    font-display: fallback;
  }

  @font-face {
    font-family: "Rubik";
    font-weight: 300;
    src: url("/fonts/Rubik-Light.ttf");
    font-display: fallback;
  }

  @font-face {
    font-family: "Roboto mono", monospace;
    font-weight: 400;
    src: url("/fonts/RobotoMono-Regular.ttf");
    font-display: fallback;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.main};
    font-family: "Rubik", sans-serif;
    min-height: 100vh;
  }
`;
