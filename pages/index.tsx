import { useImmerReducer } from "use-immer";
import { reducer } from "../utils/reducer";
import { initializeState } from "../utils/text";

import Character from "../components/Character";

const { initialState, lines } = initializeState(
  "This is long text, or at least long enough to have multiple lines",
  30
);

export default function Home() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <div>
      {lines.map((l, i) => (
        <div key={i}>
          {l.map((c) => (
            <Character key={c.position} value={c.value} />
          ))}
        </div>
      ))}
    </div>
  );
}
