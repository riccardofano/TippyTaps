import Link from "next/link";
import styled from "styled-components";
import ProgressRing from "./ProgressRing";
import { querySize } from "../utils/useMedia";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLessonCard = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.theme.colors.foreground};
  color: ${(props) => props.theme.colors.text.main};
  text-decoration: none;
  box-shadow: 0 3px 14px -5px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 200ms ease-in-out;
  transition-property: box-shadow, transform;

  &:hover {
    box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }

  &:focus {
    border: solid 2px #4ba8ec;
  }

  &:focus-within {
    outline: none;
  }
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSize.mobile.h2};
  font-weight: 400;
  margin: 0;

  @media ${querySize.medium} {
    font-size: ${(props) => props.theme.fontSize.desktop.h2};
  }
`;

const Info = styled.p`
  font-size: ${(props) => props.theme.fontSize.mobile.main};
  opacity: 0.6;
  margin: 0;

  @media ${querySize.medium} {
    font-size: ${(props) => props.theme.fontSize.desktop.main};
  }
`;

interface LessonCardProps {
  id: string;
  name: string;
  position: number;
  wpm: number;
  accuracy: number;
  progress: number;
}

export default function LessonCard({
  id,
  name,
  position,
  wpm,
  accuracy,
  progress,
}: LessonCardProps) {
  return (
    <Link href="/lessons/[lesson]" as={`/lessons/${id}`} passHref>
      <StyledLessonCard tabIndex={0}>
        <InfoContainer>
          <Title>{name}</Title>
          <Info>
            {wpm} wpm {accuracy}% accuracy
          </Info>
        </InfoContainer>
        <ProgressRing progress={progress} number={position} />
      </StyledLessonCard>
    </Link>
  );
}
