import { useCallback, useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { reducer } from "../utils/reducer";
import { initializeState } from "../utils/text";
import { keyHandler } from "../utils/keyHandles";
import { StateContext } from "../utils/types";

import Character from "../components/Character";
import Result from "../components/Result";

const { initialState, lines } = initializeState(
  "This is a long text, or at least long enough to have multiple lines. I still need more lines so let's add some more characters, having at least five lines would be exquisite",
  30
);

export default function Home() {
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
        <Result />
      </StateContext.Provider>
    </div>
  );
}
