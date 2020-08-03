import { lessonCollection } from "../../utils/db/collections";
import { initializeState } from "../../utils/text";

import LessonGame from "../../components/LessonGame";

interface LessonProps {
  lesson: firebase.firestore.DocumentData;
}
type Params = { params: { lesson: string } };

export default function Lesson({ lesson }: LessonProps) {
  return (
    <div>
      <LessonGame initialState={lesson.initialState} lines={lesson.lines} />
    </div>
  );
}

export async function getStaticPaths() {
  let paths: Params[] = [];
  await lessonCollection.get().then((snap) => {
    snap.forEach((doc) => {
      paths.push({ params: { lesson: doc.id } });
    });
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: Params) {
  const lessonName = params.lesson;
  const lessonSnap = await lessonCollection.doc(lessonName).get();
  if (!lessonSnap.exists || !lessonSnap.data()) {
    return { props: { lesson: null } };
  }
  const lesson = await lessonSnap.data();

  // TODO: have might have to divide the lines and the state initilization
  // so I can change the line length on media query change without modifying the state
  const { initialState, lines } = initializeState(lesson!.text, 30);

  return { props: { lesson: { initialState, lines } } };
}
