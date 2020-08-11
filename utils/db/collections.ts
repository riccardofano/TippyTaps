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
    .orderBy("position", "asc")
    .get()
    .then((snap) => {
      snap.forEach((doc) =>
        lessons.push({ ...doc.data(), id: doc.id } as LessonInfo)
      );
    })
    .catch((e) => console.error(e));

  return lessons;
};

export const groupLessons = (lessons: AllLessons) => {
  let groups: { [key: string]: LessonInfo[] } = {};
  for (let lesson of lessons) {
    groups[lesson.group]
      ? groups[lesson.group].push(lesson)
      : (groups[lesson.group] = [lesson]);
  }
  return groups;
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

const getUserLessonRef = (userId: string, lessonId: string) => {
  return userCollection.doc(userId).collection("lessons").doc(lessonId);
};

export const addScore = async ({
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
  const userLessonRef = getUserLessonRef(userId, lessonId);

  return firebase
    .firestore()
    .runTransaction(async (transaction) => {
      const doc = await transaction.get(userLessonRef);
      if (doc.exists) {
        const docProgress = doc.data()?.progress || 0;
        const newProgress = docProgress < progress ? progress : docProgress;

        transaction.update(userLessonRef, {
          progress: newProgress,
          scores: firebase.firestore.FieldValue.arrayUnion(score),
        });
      } else {
        transaction.set(userLessonRef, {
          progress: progress,
          scores: [score],
        });
      }
    })
    .catch((e) => console.error(e));
};

export const getScores = async ({
  userId,
  lessonId,
}: {
  userId: string;
  lessonId: string;
}) => {
  const userLessonRef = getUserLessonRef(userId, lessonId);
  const snap = await userLessonRef.get();
  return snap.data()?.scores;
};
