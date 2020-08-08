import { ICharacter } from "./types";

export const calculateAccuracy = (chars: ICharacter[], length: number) => {
  const totalIncorrect = chars.reduce((prev, current) => {
    return current.wasIncorrect ? (prev += 1) : prev;
  }, 0);

  const accuracy = (length - totalIncorrect) / length;
  return Math.round(accuracy * 100);
};

export const calculateRealAccuracy = (chars: ICharacter[], length: number) => {
  const totalCorrect = chars.reduce((prev, current) => {
    return current.correct ? (prev += 1) : prev;
  }, 0);

  const realAccuracy = totalCorrect / length;
  return Math.round(realAccuracy * 100);
};

export const calculateWpm = (startTime: number, totalKeyPresses: number) => {
  // (time now in unix - start time in unix) / 60000 to make in minutes
  const elapsedMinutes = startTime ? (Date.now() - startTime) / 60000 : 0;

  // total characters typed / 5 to make it the average word length / time
  const wpm = totalKeyPresses / 5 / elapsedMinutes;

  return Math.round(wpm);
};

type Stats = {
  wpm: number;
  accuracy: number;
  realAccuracy: number;
};

export const greaterThan100 = (score: number) => {
  return score > 100 ? 100 : score;
};

export const calculateProgress = (scores: number[]) => {
  const percent = Math.round(
    scores.reduce((previous: number, current: number) => previous * current) *
      100
  );

  return percent > 100 ? 100 : percent;
};
