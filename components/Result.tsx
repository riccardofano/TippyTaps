import { useContext, useEffect, Dispatch } from "react";
import {
  StateContext,
  UserContext,
  LessonInfo,
  IScore,
  Actions,
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

  const score: IScore = {
    wpm: calculateWpm(startTime, totalKeyPresses),
    accuracy: calculateAccuracy(characters, text.length),
    realAccuracy: calculateRealAccuracy(characters, text.length),
    timestamp: Date.now(),
  };
  const progress = calculateProgress(requirements, score);

  useEffect(() => {
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
      <p>words per minute: {score.wpm}</p>
      <p>accuracy: {score.accuracy}</p>
      <p>real accuracy: {score.realAccuracy}</p>
      <p>progress: {progress}</p>
    </div>
  );
}
