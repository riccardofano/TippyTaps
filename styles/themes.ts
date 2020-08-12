import { DefaultTheme } from "styled-components";

export const light: DefaultTheme = {
  borderRadius: "20px",
  fontSize: {
    mobile: {
      h1: "24px",
      h2: "20px",
      main: "16px",
    },
    desktop: {
      h1: "28px",
      h2: "22px",
      main: "18px",
    },
  },

  colors: {
    background: "#f0f0f0",
    foreground: "#fff",
    text: {
      main: "#2f2f2f",
      highlight: "#fff",
    },
    tiles: {
      correct: "#86eda9",
      incorrect: "#ff6e6e",
      fixed: "#ffd78c",
      current: "rgba(0, 0, 0, 0.05)",
      cursor: "#4ba8ec",
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
    tiles: {
      correct: "#2ea66c",
      incorrect: "#b93a3a",
      fixed: "#ffa857",
      current: "rgba(0, 0, 0,  0.2)",
      cursor: light.colors.tiles.cursor,
    },
  },
};
