import { useContext, useEffect, useState } from "react";
import { StateContext, UserContext, LessonInfo, IScore } from "../utils/types";
import {
  calculateWpm,
  calculateAccuracy,
  calculateRealAccuracy,
  calculateProgress,
} from "../utils/wpm";
import { addScore } from "../utils/db/collections";

export default function Result({ id, text, requirements }: LessonInfo) {
  const { characters, startTime, totalKeyPresses } = useContext(StateContext);
  const { user } = useContext(UserContext);
  const [uploaded, setUploaded] = useState(false);

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
      });
      // TODO: add the uploaded status to the state so the score
      // gets uploaded again if the user tries again without having
      // to reload the page
      setUploaded(true);
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
