import { useCallback, useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { reducer } from "../utils/reducer";
import { initializeState } from "../utils/text";
import { keyHandler } from "../utils/keyHandles";
import { StateContext } from "../utils/types";

import Character from "../components/Character";
import Result from "../components/Result";

const { initialState, lines } = initializeState(
  "This is long text, or at least long enough to have multiple lines",
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

  return (
    <div>
      <StateContext.Provider value={state}>
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
        <Result />
      </StateContext.Provider>
    </div>
  );
}
