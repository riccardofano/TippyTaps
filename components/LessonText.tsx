import { ICharacter } from "../utils/types";
import Character from "./Character";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  font-family: "Roboto mono", monospace;
  font-size: 30px;
  color: #000;
  height: 250px;
  width: max-content;
  white-space: pre;
  overflow: hidden;
`;

interface LineContainerProps {
  current: number;
  offset: number;
}

// You need to put the prop type twice for TS to stop complaining
// https://stackoverflow.com/a/61980137
const LineContainer = styled.div.attrs<LineContainerProps>(
  ({ current, offset }) => ({
    style: {
      marginTop: current > offset ? `-${(current - offset) * 59}px` : 0,
    },
  })
)<LineContainerProps>``;

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
