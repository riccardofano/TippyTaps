import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: "Rubik";
    font-weight: 400;
    src: url("fonts/Rubik-Regular.ttf");
  }

  @font-face {
    font-family: "Rubik";
    font-weight: 700;
    src: url("fonts/Rubik-Bold.ttf");
  }

  @font-face {
    font-family: "Rubik";
    font-weight: 300;
    src: url("fonts/Rubik-Light.ttf");
  }

  @font-face {
    font-family: "Roboto Mono";
    src: url("fonts/RobotoMono-Regular.ttf");
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.main};
    font-family: "Rubik", sans-serif;
  }
`;
