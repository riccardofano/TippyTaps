import { useContext, useEffect, useState } from "react";
import { StateContext, UserContext, LessonInfo } from "../utils/types";
import {
  calculateWpm,
  calculateAccuracy,
  calculateRealAccuracy,
} from "../utils/wpm";
import { addScore } from "../utils/db/collections";

export default function Result({ id, text, requirements }: LessonInfo) {
  const {
    characters,
    currentPosition,
    startTime,
    totalKeyPresses,
  } = useContext(StateContext);
  const { user } = useContext(UserContext);

  const [complete, setComplete] = useState(false);

  // TODO: calculate progress with requirements

  useEffect(() => {
    if (text.length === currentPosition) {
      if (user && id && !complete) {
        addScore(user.id, id, {
          wpm: calculateWpm(startTime, totalKeyPresses),
          accuracy: calculateAccuracy(characters, text.length),
          realAccuracy: calculateRealAccuracy(characters, text.length),
        });
      }
      setComplete(true);
    }
  }, [currentPosition]);

  return (
    <div>
      {complete && (
        <>
          <p>words per minute: {calculateWpm(startTime, totalKeyPresses)}</p>
          <p>accuracy: {calculateAccuracy(characters, text.length)}</p>
          <p>real accuracy: {calculateRealAccuracy(characters, text.length)}</p>
        </>
      )}
    </div>
  );
}
