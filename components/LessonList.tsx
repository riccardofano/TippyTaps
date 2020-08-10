import { useEffect, useState, useContext } from "react";

import {
  AllLessons,
  UserLessons,
  UserContext,
  LessonInfo,
} from "../utils/types";
import { querySize } from "../utils/useMedia";
import {
  getUserLessons,
  getAllLessons,
  groupLessons,
} from "../utils/db/collections";

import LessonCard from "./LessonCard";
import styled from "styled-components";

const StyledGroupList = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;

  & h1 {
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 1rem;
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

export default function LessonList() {
  const { user } = useContext(UserContext);

  const [lessons, setLessons] = useState<AllLessons>([]);
  const [userLessons, setUserLessons] = useState<UserLessons>({});
  const [groups, setGroups] = useState<{ [key: string]: LessonInfo[] }>();

  useEffect(() => {
    getAllLessons().then((data) => {
      setLessons(data);
      setGroups(groupLessons(data));
    });

    if (user) {
      getUserLessons(user.id).then((data) => setUserLessons(data));
    } else {
      setUserLessons({});
    }
  }, [user]);

  return (
    <>
      {lessons &&
        groups &&
        Object.keys(groups).map((group) => (
          <StyledGroupList>
            <h1>{group}</h1>
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
