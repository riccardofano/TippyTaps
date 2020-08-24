import { lessonCollection } from "../../utils/db/collections";
import { initializeState } from "../../utils/text";

import LessonGame from "../../components/LessonGame";
import Layout from "../../components/Layout";
import { LessonInfo, IState, ICharacter } from "../../utils/types";

interface LessonProps {
  info: LessonInfo;
  initialState: IState;
  lines: ICharacter[][];
}
type Params = { params: { lesson: string } };

export default function Lesson({ info, initialState }: LessonProps) {
  return (
    <Layout title={`${info.name} | TippyTaps`} url={`/lessons/${info.id}`}>
      <LessonGame initialState={initialState} info={info} />
    </Layout>
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
  const info = { ...lessonSnap.data(), id: lessonSnap.id } as LessonInfo;

  // TODO: have might have to divide the lines and the state initilization
  // so I can change the line length on media query change without modifying the state
  const initialState = initializeState(info.text);

  return { props: { info, initialState } };
}
