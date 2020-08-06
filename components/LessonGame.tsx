import { useCallback, useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { StateContext, IState, ICharacter, LessonInfo } from "../utils/types";
import { keyHandler } from "../utils/keyHandler";
import { reducer } from "../utils/reducer";

import LessonText from "./LessonText";
import Result from "./Result";
import Chart from "./Chart";
import ProgressBar from "./ProgressBar";

interface LessonGameProps {
  info: LessonInfo;
  initialState: IState;
  lines: ICharacter[][];
}

export default function LessonGame({
  info,
  initialState,
  lines,
}: LessonGameProps) {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const handler = useCallback((e) => {
    keyHandler(e, dispatch);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  });

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
          <>
            <ProgressBar
              length={(state.currentPosition / state.text.length) * 100}
            />
            <LessonText
              lines={lines}
              currentLine={state.currentLine}
              lineOffset={1}
            />
          </>
        )}
      </StateContext.Provider>
    </div>
  );
}
