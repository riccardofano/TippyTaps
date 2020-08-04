import { useState, useEffect } from "react";
import cookies from "js-cookie";
import { useRouter } from "next/router";

import initFirebase from "./init";
import firebase from "firebase/app";
import "firebase/auth";

import { User } from "../types";

initFirebase();

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
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
      return;
    }
    setUser(JSON.parse(cookie));
  }, []);

  return { user, logout };
};
