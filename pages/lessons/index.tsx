import Layout from "../../components/Layout";
import LessonList from "../../components/LessonList";

import { groupLessons, getAllLessons } from "../../utils/db/collections";
import { LessonInfo } from "../../utils/types";

export interface LessonsProps {
  groups: { [key: string]: LessonInfo[] };
}
export default function Lessons({ groups }: LessonsProps) {
  return (
    <Layout url="/lessons">
      <LessonList groups={groups} />
    </Layout>
  );
}

export async function getStaticProps({}) {
  const lessons = await getAllLessons();
  const groups = groupLessons(lessons);

  return {
    props: {
      groups,
    },
  };
}
