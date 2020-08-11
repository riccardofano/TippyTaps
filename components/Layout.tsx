import { useUser } from "../utils/db/useUser";
import { UserContext } from "../utils/types";
import { querySize } from "../utils/useMedia";
import styled from "styled-components";

import Navbar from "./NavBar";

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

  return (
    <StyledLayout>
      <UserContext.Provider value={{ user, logout }}>
        <Navbar url={url} />
        {children}
      </UserContext.Provider>
    </StyledLayout>
  );
}
