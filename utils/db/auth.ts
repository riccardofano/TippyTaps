import initFirebase from "./init";
import firebase from "firebase/app";
import "firebase/auth";
import cookies from "js-cookie";

initFirebase();

export const firebaseAuthConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        prompt: "select_account",
      },
    },
  ],
  signInSuccessUrl: "/",
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: ({ user }, redirectUrl) => {
      const { uid, email, xa } = user;
      const userData = {
        id: uid,
        email,
        token: xa,
      };
      cookies.set("auth", userData, {
        expires: 1,
      });
      return true;
    },
  },
};

export const firebaseAuth = firebase.auth();
