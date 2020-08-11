import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.main};
    font-family: "Rubik", sans-serif;
  }
`;
