import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      foreground: string;
      text: {
        main: string;
        highlight: string;
      };
    };
  }
}
