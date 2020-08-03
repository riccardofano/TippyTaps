import { useEffect, useState } from "react";
import { lessonCollection } from "../../utils/db/collections";

export default function Lessons() {
  const [lessons, setLessons] = useState<firebase.firestore.DocumentData[]>([]);

  useEffect(() => {
    let tempLessons: firebase.firestore.DocumentData[] = [];
    lessonCollection.get().then((snap) => {
      snap.forEach((doc) => {
        tempLessons.push(doc.data());
      });
      setLessons(tempLessons);
    });
  }, []);

  return (
    <div>
      {lessons &&
        lessons.map((lesson, i) => (
          <pre key={i}>{JSON.stringify(lesson, null, 4)}</pre>
        ))}
    </div>
  );
}
