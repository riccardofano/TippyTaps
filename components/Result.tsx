import { useContext, useEffect, useState } from "react";
import { StateContext, UserContext, LessonInfo } from "../utils/types";
import {
  calculateWpm,
  calculateAccuracy,
  calculateRealAccuracy,
  calculateProgress,
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
        const score = {
          wpm: calculateWpm(startTime, totalKeyPresses),
          accuracy: calculateAccuracy(characters, text.length),
          realAccuracy: calculateRealAccuracy(characters, text.length),
        };
        const progress = calculateProgress(requirements, score);

        addScore({
          userId: user.id,
          lessonId: id,
          score,
          progress,
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
          <p>
            progress:{" "}
            {calculateProgress(requirements, {
              wpm: calculateWpm(startTime, totalKeyPresses),
              accuracy: calculateAccuracy(characters, text.length),
              realAccuracy: calculateRealAccuracy(characters, text.length),
            })}
          </p>
        </>
      )}
    </div>
  );
}
