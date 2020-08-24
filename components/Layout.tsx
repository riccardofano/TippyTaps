import Head from "next/head";
import styled from "styled-components";

import { useUser } from "../utils/db/useUser";
import { UserContext } from "../utils/types";
import { querySize } from "../utils/useMedia";

import Navbar from "./NavBar";

const StyledLayout = styled.main`
  margin: 0 auto;
  padding: 0 35px;

  @media ${querySize.medium} {
    padding: 0 4rem;
  }

  @media ${querySize.large} {
    max-width: 1160px;
    padding: 0;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
  url?: string;
  title: string;
}

export default function Layout({ children, url, title }: LayoutProps) {
  const { user, logout } = useUser();

  return (
    <StyledLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <UserContext.Provider value={{ user, logout }}>
        <Navbar url={url} />
        {children}
      </UserContext.Provider>
    </StyledLayout>
  );
}
