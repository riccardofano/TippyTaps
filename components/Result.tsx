import { useContext } from "react";
import { StateContext } from "../utils/types";
import {
  calculateWpm,
  calculateAccuracy,
  calculateRealAccuracy,
} from "../utils/wpm";

export default function Result() {
  const {
    text,
    characters,
    currentPosition,
    startTime,
    totalKeyPresses,
  } = useContext(StateContext);

  return (
    <div>
      {text.length === currentPosition && (
        <>
          <p>words per minute: {calculateWpm(startTime, totalKeyPresses)}</p>
          <p>accuracy: {calculateAccuracy(characters, text.length)}</p>
          <p>real accuracy: {calculateRealAccuracy(characters, text.length)}</p>
        </>
      )}
    </div>
  );
}
