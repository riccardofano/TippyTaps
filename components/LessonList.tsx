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
import styled, { keyframes } from "styled-components";
import { Icon } from "@iconify/react";
import reload from "@iconify/icons-oi/reload";

const rotate = keyframes`
  from { transform: rotate(0)}
  to {transform: rotate(360deg)}
`;

const LoadingIcon = styled(Icon)`
  font-size: 2rem;
  display: block;
  margin: 2rem auto 0;
  animation: ${rotate} 500ms infinite;
`;

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

export default function LessonList() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const [lessons, setLessons] = useState<AllLessons>([]);
  const [userLessons, setUserLessons] = useState<UserLessons>({});
  const [groups, setGroups] = useState<{ [key: string]: LessonInfo[] }>();

  useEffect(() => {
    getAllLessons().then((data) => {
      setLessons(data);
      setGroups(groupLessons(data));
      setLoading(false);
    });

    if (user) {
      getUserLessons(user.id).then((data) => setUserLessons(data));
    } else {
      setUserLessons({});
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <LoadingIcon icon={reload} />
      ) : (
        lessons &&
        groups &&
        Object.keys(groups).map((group) => (
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
        ))
      )}
    </>
  );
}
