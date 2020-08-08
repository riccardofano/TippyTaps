import { useContext, useEffect, Dispatch, useState, useMemo } from "react";
import {
  StateContext,
  UserContext,
  LessonInfo,
  Actions,
  IResult,
  IScore,
} from "../utils/types";
import {
  calculateWpm,
  calculateAccuracy,
  calculateRealAccuracy,
  calculateProgress,
  greaterThan100,
} from "../utils/wpm";
import { addScore } from "../utils/db/collections";

import ProgressRing from "./ProgressRing";

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

  const result = useMemo<IScore>(
    () => ({
      wpm: calculateWpm(startTime, totalKeyPresses),
      accuracy: calculateAccuracy(characters, text.length),
      realAccuracy: calculateRealAccuracy(characters, text.length),
      timestamp: Date.now(),
    }),
    []
  );

  const progress = useMemo(() => {
    // This is so dumb
    const wpmPercent = result.wpm / requirements.wpm;
    const accuracyPercent = result.accuracy / requirements.accuracy;
    const realAccuracyPercent = result.realAccuracy / requirements.realAccuracy;
    return {
      wpm: greaterThan100(Math.round(wpmPercent * 100)),
      accuracy: greaterThan100(Math.round(accuracyPercent * 100)),
      realAccuracy: greaterThan100(Math.round(realAccuracyPercent * 100)),
      total: calculateProgress([
        wpmPercent,
        accuracyPercent,
        realAccuracyPercent,
      ]),
    };
  }, []);

  useEffect(() => {
    if (user && id && !uploaded) {
      addScore({
        userId: user.id,
        lessonId: id,
        score: result,
        progress: progress.total,
      }).then(() => {
        dispatch({ type: "uploaded" });
      });
    }
  }, []);

  return (
    <div>
      {result && (
        <>
          <ProgressRing progress={progress.wpm} number={result.wpm} />
          <ProgressRing progress={progress.accuracy} number={result.accuracy} />
          <ProgressRing
            progress={progress.realAccuracy}
            number={result.realAccuracy}
          />
        </>
      )}
    </div>
  );
}
