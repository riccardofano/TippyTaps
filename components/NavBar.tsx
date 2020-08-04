import FirebaseAuth from "./FirebaseAuth";

import { useContext } from "react";
import { UserContext } from "../utils/types";

interface NavbarProps {
  url?: string;
}

export default function Navbar({ url }: NavbarProps) {
  const { user, logout } = useContext(UserContext);

  return (
    <div>
      {user ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <FirebaseAuth url={url} />
      )}
    </div>
  );
}
