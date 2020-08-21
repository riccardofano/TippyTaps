import { useEffect, useState, useContext } from "react";

import { UserLessons, UserContext } from "../utils/types";
import { LessonsProps } from "../pages/lessons/index";
import { querySize } from "../utils/useMedia";
import { getUserLessons } from "../utils/db/collections";

import LessonCard from "./LessonCard";
import styled from "styled-components";

const StyledGroupList = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

const GroupHeader = styled.h1`
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.mobile.h1};
  font-weight: 400;
  margin-bottom: 1rem;

  @media ${querySize.medium} {
    font-size: ${(props) => props.theme.fontSize.desktop.h1};
  }
`;

const StyledLessonList = styled.div`
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

export default function LessonList({ groups }: LessonsProps) {
  const { user } = useContext(UserContext);
  const [userLessons, setUserLessons] = useState<UserLessons>({});

  useEffect(() => {
    if (user) {
      getUserLessons(user.id).then((data) => setUserLessons(data));
    } else {
      setUserLessons({});
    }
  }, [user]);

  return (
    <>
      {Object.keys(groups).map((group) => (
        <StyledGroupList key={group}>
          <GroupHeader>{group}</GroupHeader>
          <StyledLessonList>
            {groups[group].map((lesson) => (
              <LessonCard
                key={lesson.position}
                id={lesson.id}
                position={lesson.position}
                name={lesson.name}
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
        </StyledGroupList>
      ))}
    </>
  );
}
