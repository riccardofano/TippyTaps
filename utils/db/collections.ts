import initFirebase from "./init";
import firebase from "firebase/app";
import "firebase/firestore";

import { AllLessons, UserLessons, IScore } from "../types";

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

const addToArray = (
  ref: firebase.firestore.DocumentReference,
  key: string,
  value: any
) => {
  ref.update({
    [key]: firebase.firestore.FieldValue.arrayUnion(value),
  });
};

export const addScore = (userId: string, lessonId: string, score: IScore) => {
  userCollection
    .doc(userId)
    .collection("lessons")
    .doc(lessonId)
    .get()
    .then((snap) => {
      if (snap.exists) {
        addToArray(snap.ref, "scores", score);
      } else {
        snap.ref.set({ score });
      }
    })
    .catch((error) => console.error(error));
};
