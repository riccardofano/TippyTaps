import { useUser } from "../utils/db/useUser";
import { UserContext } from "../utils/types";
import styled from "styled-components";

import Navbar from "./NavBar";

const StyledLayout = styled.main`
  margin: 0 auto;
  padding: 0 35px;

  @media (min-width: 800px) {
    max-width: 768px;
    padding: 0;
  }
  @media (min-width: 1200px) {
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
