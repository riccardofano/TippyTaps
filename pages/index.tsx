import { useImmerReducer } from "use-immer";
import { reducer } from "../utils/reducer";
import { initializeState } from "../utils/text";

const { initialState, lines } = initializeState("This is a test", 30);

export default function Home() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <div>
      {lines.map((l, i) => (
        <div key={i}>
          {l.map((c) => (
            <span key={c.position}>{c.value}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
