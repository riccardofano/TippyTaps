import Link from "next/link";
import styled from "styled-components";
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
  margin-bottom: 20px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 3px 14px -5px rgba(0, 0, 0, 0.15);
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
  name: string;
  wpm: number;
  accuracy: number;
  progress: number;
}

export default function LessonCard({
  id,
  name,
  wpm,
  accuracy,
  progress,
}: LessonCardProps) {
  return (
    <Link href={`lessons/${id}`}>
      <StyledLessonCard>
        <InfoContainer>
          <Title>{name}</Title>
          <Info>
            {wpm} wpm {accuracy}% accuracy
          </Info>
        </InfoContainer>
        <ProgressRing progress={progress} />
      </StyledLessonCard>
    </Link>
  );
}
