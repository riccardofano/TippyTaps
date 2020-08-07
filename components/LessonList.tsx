import { useEffect, useState, useContext } from "react";

import { AllLessons, UserLessons, UserContext } from "../utils/types";
import { querySize } from "../utils/useMedia";
import { getUserLessons, getAllLessons } from "../utils/db/collections";

import LessonCard from "./LessonCard";
import styled from "styled-components";

const StyledLessonList = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;

  @media ${querySize.medium} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${querySize.large} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

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
    <StyledLessonList>
      {lessons &&
        lessons.map((lesson, i) => (
          <LessonCard
            key={i}
            number={i + 1}
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
    </StyledLessonList>
  );
}
