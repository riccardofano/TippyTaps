import { useCallback, useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { StateContext, IState, ICharacter, LessonInfo } from "../utils/types";
import { keyHandler } from "../utils/keyHandler";
import { reducer } from "../utils/reducer";

import Character from "../components/Character";
import Result from "../components/Result";

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

  // This determines when the line should start and stop scrolling
  const lineOffset = 1;

  return (
    <div>
      <StateContext.Provider value={state}>
        <div style={{ overflow: "hidden", height: "100px" }}>
          <div
            style={{
              marginTop:
                state.currentLine > lineOffset
                  ? `-${(state.currentLine - lineOffset) * 20}px`
                  : "0",
            }}
          >
            {lines.map((l, i) => (
              <div key={i}>
                {l.map((c) => (
                  <Character
                    key={c.position}
                    value={c.value}
                    position={c.position}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <Result {...info} />
      </StateContext.Provider>
    </div>
  );
}
