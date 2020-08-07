import { useEffect, useState, useContext } from "react";
import Link from "next/link";

import { AllLessons, UserLessons, UserContext } from "../utils/types";
import { getUserLessons, getAllLessons } from "../utils/db/collections";

import LessonCard from "./LessonCard";

export default function LessonList() {
  const { user } = useContext(UserContext);

  const [lessons, setLessons] = useState<AllLessons>([]);
  const [userLessons, setUserLessons] = useState<UserLessons>({});

  useEffect(() => {
    getAllLessons().then((data) => setLessons(data));
    if (user) {
      getUserLessons(user.id).then((data) => setUserLessons(data));
    } else {
      setUserLessons({});
    }
  }, [user]);

  return (
    <>
      {lessons &&
        lessons.map((lesson, i) => (
          <LessonCard
            key={i}
            id={lesson.id}
            name={lesson.id}
            wpm={lesson.requirements.wpm}
            accuracy={lesson.requirements.accuracy}
            progress={
              userLessons[lesson.id] && userLessons[lesson.id].progress
                ? userLessons[lesson.id].progress
                : 0
            }
          />
        ))}
    </>
  );
}
