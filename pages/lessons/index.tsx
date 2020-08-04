import { useEffect, useState } from "react";

import { AllLessons, UserLessons } from "../../utils/types";
import { getUserLessons, getAllLessons } from "../../utils/db/collections";
import { useUser } from "../../utils/db/useUser";

export default function Lessons() {
  const { user } = useUser();
  const [lessons, setLessons] = useState<AllLessons>([]);
  const [userLessons, setUserLessons] = useState<UserLessons>({});

  useEffect(() => {
    getAllLessons().then((data) => setLessons(data));
    if (user) {
      getUserLessons(user.id).then((data) => setUserLessons(data));
    }
  }, [user]);

  return (
    <div>
      {lessons &&
        lessons.map((lesson, i) => (
          <pre key={i}>
            {userLessons[lesson.id]
              ? lesson.id + " played before"
              : lesson.id + " not played"}
          </pre>
        ))}
    </div>
  );
}
