import { useUser } from "../utils/db/useUser";
import { UserContext } from "../utils/types";

import Navbar from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
  url?: string;
}

export default function Layout({ children, url }: LayoutProps) {
  const { user, logout } = useUser();

  return (
    <UserContext.Provider value={{ user, logout }}>
      <Navbar url={url} />
      {children}
    </UserContext.Provider>
  );
}
