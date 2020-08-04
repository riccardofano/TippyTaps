import initFirebase from "./init";
import firebase from "firebase/app";
import "firebase/firestore";

import { AllLessons, UserLessons } from "../types";

initFirebase();

export const lessonCollection = firebase.firestore().collection("lessons");
export const userCollection = firebase.firestore().collection("users");

export const getAllLessons = async () => {
  let lessons: AllLessons = [];
  await lessonCollection
    .get()
    .then((snap) => {
      snap.forEach((doc) => lessons.push({ ...doc.data(), id: doc.id }));
    })
    .catch((e) => console.error(e));

  return lessons;
};

export const getUserLessons = async (userId: string) => {
  let visitedLessons: UserLessons = {};
  await userCollection
    .doc(userId)
    .collection("lessons")
    .get()
    .then((snap) => {
      snap.forEach((doc) => (visitedLessons[doc.id] = doc.data()));
    })
    .catch((e) => console.error(e));

  return visitedLessons;
};
