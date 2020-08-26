import Head from "next/head";
import styled, { ThemeConsumer, ThemeContext } from "styled-components";

import { useUser } from "../utils/db/useUser";
import { UserContext } from "../utils/types";
import { querySize } from "../utils/useMedia";

import Navbar from "./NavBar";
import { useContext } from "react";

const StyledLayout = styled.main`
  margin: 0 auto;
  padding: 0 35px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media ${querySize.medium} {
    padding: 0 4rem;
  }

  @media ${querySize.large} {
    max-width: 1160px;
    padding: 0;
  }
`;

const Content = styled.div`
  flex: 1;
`;

interface LayoutProps {
  children: React.ReactNode;
  url?: string;
  title: string;
}

export default function Layout({ children, url, title }: LayoutProps) {
  const { user, logout } = useUser();
  const theme = useContext(ThemeContext);

  return (
    <StyledLayout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Improve your typing skills with a ton of free lessons."
        />
        <meta name="theme-color" content={theme.colors.foreground} />
        <title>{title}</title>
      </Head>
      <UserContext.Provider value={{ user, logout }}>
        <Navbar url={url} />
        <Content>{children}</Content>
      </UserContext.Provider>
    </StyledLayout>
  );
}
