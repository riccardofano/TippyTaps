import { DefaultTheme } from "styled-components";

export const light: DefaultTheme = {
  colors: {
    background: "#f0f0f0",
    foreground: "#fff",
    text: {
      main: "#2f2f2f",
      highlight: "#fff",
    },
  },
};

export const dark: DefaultTheme = {
  ...light,

  colors: {
    background: "#222e39",
    foreground: "#2c4257",
    text: {
      main: "#eee",
      highlight: "#fff",
    },
  },
};
