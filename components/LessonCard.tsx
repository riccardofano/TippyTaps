import Link from "next/link";
import styled from "styled-components";
import { querySize } from "../utils/useMedia";
import ProgressRing from "./ProgressRing";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLessonCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 3px 14px -5px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 400;
  margin: 0;
`;

const Info = styled.p`
  font-size: 16px;
`;

interface LessonCardProps {
  id: string;
  number: number;
  name: string;
  wpm: number;
  accuracy: number;
  progress: number;
}

export default function LessonCard({
  id,
  number,
  name,
  wpm,
  accuracy,
  progress,
}: LessonCardProps) {
  return (
    <Link href="/lessons/[lesson]" as={`/lessons/${id}`}>
      <StyledLessonCard>
        <InfoContainer>
          <Title>{name}</Title>
          <Info>
            {wpm} wpm {accuracy}% accuracy
          </Info>
        </InfoContainer>
        <ProgressRing progress={progress} number={number} />
      </StyledLessonCard>
    </Link>
  );
}
