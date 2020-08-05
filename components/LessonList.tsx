import { useEffect, useState, useContext } from "react";
import Link from "next/link";

import { AllLessons, UserLessons, UserContext } from "../utils/types";
import { getUserLessons, getAllLessons } from "../utils/db/collections";

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
          <pre key={i}>
            {userLessons[lesson.id] && userLessons[lesson.id].progress ? (
              <Link href={`/lessons/${lesson.id}`}>
                <a>
                  {lesson.id} {userLessons[lesson.id].progress}%
                </a>
              </Link>
            ) : (
              `${lesson.id} 0%`
            )}
          </pre>
        ))}
    </>
  );
}
