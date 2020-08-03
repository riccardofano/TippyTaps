import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "./init";

initFirebase();

export const lessonCollection = firebase.firestore().collection("lessons");
