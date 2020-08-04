import { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebaseAuthConfig, firebaseAuth } from "../utils/db/auth";

interface FirebaseAuthProps {
  url?: string;
}

export default function FirebaseAuth({ url }: FirebaseAuthProps) {
  const [renderAuth, setRenderAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);

  return (
    <div>
      {renderAuth && (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig(url)}
          firebaseAuth={firebaseAuth}
        />
      )}
    </div>
  );
}
