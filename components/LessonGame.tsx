import { useCallback, useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";

import { StateContext, IState, ICharacter, LessonInfo } from "../utils/types";
import { keyHandler } from "../utils/keyHandler";
import { reducer } from "../utils/reducer";
import { useMedia } from "../utils/useMedia";

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
    ["(min-width: 1200px)", "(min-width: 800px)", "(min-width: 360px)"],
    [30, 20, 10],
    30
  );

  useEffect(() => {
    const [currenLines, lineLengths] = buildLines(state.characters, lineWidth);
    setLines(currenLines);
    dispatch({ type: "widthChange", payload: lineLengths });
  }, [lineWidth]);

  return (
    <div>
      <StateContext.Provider value={state}>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
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
