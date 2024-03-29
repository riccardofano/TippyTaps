import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
    gradient: (string) => string;

    fontSize: {
      mobile: {
        h1: string;
        h2: string;
        main: string;
      };
      desktop: {
        h1: string;
        h2: string;
        main: string;
      };
    };

    colors: {
      background: string;
      foreground: string;
      text: {
        main: string;
        highlight: string;
      };
      tiles: {
        correct: string;
        incorrect: string;
        fixed: string;
        current: string;
        cursor: string;
      };
    };
  }
}
