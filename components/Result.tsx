import { useContext, useEffect, Dispatch, useState } from "react";
import {
  StateContext,
  UserContext,
  LessonInfo,
  IScore,
  Actions,
  IResult,
} from "../utils/types";
import {
  calculateWpm,
  calculateAccuracy,
  calculateRealAccuracy,
  calculateProgress,
} from "../utils/wpm";
import { addScore } from "../utils/db/collections";

interface ResultsProps extends LessonInfo {
  dispatch: Dispatch<Actions>;
}

export default function Result({
  id,
  text,
  requirements,
  dispatch,
}: ResultsProps) {
  const { characters, startTime, totalKeyPresses, uploaded } = useContext(
    StateContext
  );
  const { user } = useContext(UserContext);
  const [result, setResult] = useState<IResult>();

  useEffect(() => {
    const score = {
      wpm: calculateWpm(startTime, totalKeyPresses),
      accuracy: calculateAccuracy(characters, text.length),
      realAccuracy: calculateRealAccuracy(characters, text.length),
      timestamp: Date.now(),
    };
    const progress = calculateProgress(requirements, score);
    setResult({ score, progress });

    if (user && id && !uploaded) {
      addScore({
        userId: user.id,
        lessonId: id,
        score,
        progress,
      }).then(() => {
        dispatch({ type: "uploaded" });
      });
    }
  }, []);

  return (
    <div>
      {result && (
        <>
          <p>words per minute: {result.score.wpm}</p>
          <p>accuracy: {result.score.accuracy}</p>
          <p>real accuracy: {result.score.realAccuracy}</p>
          <p>progress: {result.progress}</p>
        </>
      )}
    </div>
  );
}
