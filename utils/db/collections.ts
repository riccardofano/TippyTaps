import initFirebase from "./init";
import firebase from "firebase/app";
import "firebase/firestore";

import { AllLessons, UserLessons, IScore, LessonInfo } from "../types";

initFirebase();

export const lessonCollection = firebase.firestore().collection("lessons");
export const userCollection = firebase.firestore().collection("users");

export const getAllLessons = async () => {
  let lessons: AllLessons = [];
  await lessonCollection
    .get()
    .then((snap) => {
      snap.forEach((doc) =>
        lessons.push({ ...doc.data(), id: doc.id } as LessonInfo)
      );
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

export const addScore = ({
  userId,
  lessonId,
  score,
  progress,
}: {
  userId: string;
  lessonId: string;
  score: IScore;
  progress: number;
}) => {
  const userLessonRef = userCollection
    .doc(userId)
    .collection("lessons")
    .doc(lessonId);

  firebase
    .firestore()
    .runTransaction((transaction) => {
      return transaction.get(userLessonRef).then((doc) => {
        if (doc.exists) {
          const docProgress = doc.data()?.progress || 0;
          const newProgress = docProgress < progress ? progress : docProgress;

          transaction.update(userLessonRef, {
            progress: newProgress,
            scores: firebase.firestore.FieldValue.arrayUnion(score),
          });
        } else {
          transaction.update(userLessonRef, {
            progress: progress,
            scores: score,
          });
        }
      });
    })
    .catch((e) => console.error(e));
};
