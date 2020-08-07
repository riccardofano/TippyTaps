import { ICharacter } from "../utils/types";
import { querySize } from "../utils/useMedia";
import Character from "./Character";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  font-family: "Roboto mono", monospace;
  font-size: 22px;
  color: #000;
  height: 250px;
  width: max-content;
  white-space: pre;
  overflow: hidden;

  @media ${querySize.medium} {
    font-size: 32px;
  }
`;

interface LineContainerProps {
  current: number;
  offset: number;
}

// This is so jank, there has to be a better way.
// but I don't want to create a new class per line per screen size
const LineContainer = styled.div.attrs<LineContainerProps>(
  ({ current, offset }) => ({
    style: {
      marginTop:
        current > offset
          ? `calc(-${current - offset} * var(--line-height))`
          : 0,
    },
  })
)<LineContainerProps>`
  --line-height: 49px;

  @media ${querySize.medium} {
    --line-height: 63px;
  }
`;

const Line = styled.div`
  margin-top: 20px;
`;

interface LessonTextProps {
  lines: ICharacter[][];
  currentLine: number;
  lineOffset: number;
}

export default function LessonText({
  lines,
  currentLine,
  lineOffset,
}: LessonTextProps) {
  return (
    <Container>
      <LineContainer current={currentLine} offset={lineOffset}>
        {lines.map((l, i) => (
          <Line key={i}>
            {l.map((c) => (
              <Character
                key={c.position}
                value={c.value}
                position={c.position}
              />
            ))}
          </Line>
        ))}
      </LineContainer>
    </Container>
  );
}
