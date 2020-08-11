import { useUser } from "../utils/db/useUser";
import { UserContext } from "../utils/types";
import { querySize } from "../utils/useMedia";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/global";
import { light, dark } from "../styles/themes";

import Navbar from "./NavBar";
import { useState } from "react";

const StyledLayout = styled.main`
  margin: 0 auto;
  padding: 0 35px;

  @media (${querySize.medium}) {
    max-width: 768px;
    padding: 0;
  }
  @media (${querySize.large}) {
    max-width: 1160px;
    padding: 0;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
  url?: string;
}

export default function Layout({ children, url }: LayoutProps) {
  const { user, logout } = useUser();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const themeToggle = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyles />
      <StyledLayout>
        <UserContext.Provider value={{ user, logout }}>
          <Navbar url={url} themeToggle={themeToggle} />
          {children}
        </UserContext.Provider>
      </StyledLayout>
    </ThemeProvider>
  );
}
