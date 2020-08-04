import { useState, useEffect } from "react";

import FirebaseAuth from "../components/FirebaseAuth";
import { useUser } from "../utils/db/useUser";

export default function Auth() {
  const { user, logout } = useUser();
  const [url, setUrl] = useState<string | undefined>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.pathname);
    }
  }, []);

  return (
    <>
      {user ? (
        <div>
          <p>You're signed in</p>
          <button onClick={() => logout()}>Log out</button>
        </div>
      ) : (
        <div>
          <p>Sign in</p>
          <FirebaseAuth url={url} />
        </div>
      )}
    </>
  );
}
