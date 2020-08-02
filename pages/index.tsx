import { useImmerReducer } from "use-immer";
import { reducer } from "../utils/reducer";

const initialState = {
  text: "",
  characters: [],
  lineLengths: [],
  currentLine: 0,
  currentPosition: 0,
  startTime: 0,
  started: false,
  totalKeyPresses: 0,
};

export default function Home() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  return <div></div>;
}
