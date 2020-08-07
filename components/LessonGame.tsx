import { useCallback, useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";

import { StateContext, IState, ICharacter, LessonInfo } from "../utils/types";
import { keyHandler } from "../utils/keyHandler";
import { reducer } from "../utils/reducer";
import { useMedia, querySize } from "../utils/useMedia";

import LessonText from "./LessonText";
import Result from "./Result";
import Chart from "./Chart";
import ProgressBar from "./ProgressBar";
import { buildLines } from "../utils/text";
import { setMaxListeners } from "process";

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
    dispatch({ type: "widthChange", payload: lineLengths });
  }, [lineWidth]);

  return (
    <div>
      <StateContext.Provider value={state}>
        <button
          onClick={() => dispatch({ type: "reset", payload: lineLengths })}
        >
          Reset
        </button>
        {state.text.length === state.currentPosition ? (
          <>
            <Result {...info} dispatch={dispatch} />
            <Chart lessonId={info.id} />
          </>
        ) : (
          <div style={{ width: "max-content", margin: "0 auto" }}>
            <ProgressBar
              length={(state.currentPosition / state.text.length) * 100}
            />
            <LessonText
              lines={lines}
              currentLine={state.currentLine}
              lineOffset={1}
            />
          </div>
        )}
      </StateContext.Provider>
    </div>
  );
}
