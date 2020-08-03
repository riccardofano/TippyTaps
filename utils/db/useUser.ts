import { useState, useEffect } from "react";
import firebase from "firebase/app";
import cookies from "js-cookie";
import { useRouter } from "next/router";

export const useUser = () => {
  const [user, setUser] = useState<firebase.User | null>();
  const router = useRouter();

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        cookies.remove("auth");
        setUser(null);
        router.push("/auth");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    const cookie = cookies.get("auth");
    if (!cookie) {
      router.push("/");
      return;
    }
    setUser(JSON.parse(cookie));
  }, []);

  return { user, logout };
};
