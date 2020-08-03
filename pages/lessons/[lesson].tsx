import { lessonCollection } from "../../utils/db/collections";

interface LessonProps {
  lesson: firebase.firestore.DocumentData;
}
type Params = { params: { lesson: string } };

export default function Lesson({ lesson }: LessonProps) {
  return <div>{lesson.text}</div>;
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
  const lesson = lessonSnap.exists ? lessonSnap.data() : null;

  return { props: { lesson } };
}
