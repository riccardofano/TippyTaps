import FirebaseAuth from "../components/FirebaseAuth";
import { useUser } from "../utils/db/useUser";

export default function Auth() {
  const { user, logout } = useUser();

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
          <FirebaseAuth />
        </div>
      )}
    </>
  );
}
