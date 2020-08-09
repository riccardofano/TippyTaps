import { useCallback, useEffect, useState, MouseEvent } from "react";
import { useImmerReducer } from "use-immer";
import styled, { keyframes } from "styled-components";

import { StateContext, IState, ICharacter, LessonInfo } from "../utils/types";
import { keyHandler } from "../utils/keyHandler";
import { reducer } from "../utils/reducer";
import { useMedia, querySize } from "../utils/useMedia";
import { buildLines } from "../utils/text";

import LessonText from "./LessonText";
import Result from "./Result";
import Chart from "./Chart";
import ProgressBar from "./ProgressBar";
import { Button } from "./Buttons";

const ResetButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;
`;

const appearAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50px);
  }

  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const StartNotice = styled.span`
  position: fixed;
  top: 7rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  text-align: center;
  color: #fff;
  background: linear-gradient(90deg, #4ba8ec 0%, #0f57c2 100%);
  padding: 0.5rem 2rem;
  border-radius: 20px;

  animation: ${appearAnimation} 500ms ease-in-out;
`;

interface LessonGameProps {
  info: LessonInfo;
  initialState: IState;
}

export default function LessonGame({ info, initialState }: LessonGameProps) {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [lines, setLines] = useState<ICharacter[][]>([]);
  const [lineLengths, setLineLengths] = useState<number[]>([]);

  const handler = useCallback((e) => {
    keyHandler(e, dispatch);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  });

  const lineWidth = useMedia(
    [querySize.large, querySize.medium, querySize.small],
    [30, 20, 10],
    30
  );

  useEffect(() => {
    const [currenLines, Lengths] = buildLines(state.characters, lineWidth);
    setLines(currenLines);
    setLineLengths(Lengths);
    dispatch({ type: "widthChange", payload: Lengths });
  }, [lineWidth]);

  const handleReset = (event: MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: "reset", payload: lineLengths });
    // Remove focus otherwise pressing spacebar will reset the progress
    event.currentTarget.blur();
  };

  return (
    <div>
      <StateContext.Provider value={state}>
        {state.text.length === state.currentPosition ? (
          <>
            <Result {...info} dispatch={dispatch} />
            <ResetButtonContainer>
              <Button onClick={handleReset}>Reset</Button>
            </ResetButtonContainer>
            <Chart lessonId={info.id} />
          </>
        ) : (
          <>
            {!state.started && <StartNotice>Start typing</StartNotice>}
            <div style={{ width: "max-content", margin: "9rem auto 0" }}>
              <ProgressBar
                length={(state.currentPosition / state.text.length) * 100}
              />
              <LessonText
                lines={lines}
                currentLine={state.currentLine}
                lineOffset={2}
              />
              <ResetButtonContainer>
                <Button onClick={handleReset}>Reset</Button>
              </ResetButtonContainer>
            </div>
          </>
        )}
      </StateContext.Provider>
    </div>
  );
}
