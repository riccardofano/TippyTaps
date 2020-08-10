import { createContext } from "react";

export interface ICharacter {
  value: string;
  position: number;
  correct: boolean;
  wasIncorrect: boolean;
}

export interface IState {
  text: string;
  characters: ICharacter[];
  lineLengths: number[];
  currentLine: number;
  currentPosition: number;
  totalKeyPresses: number;
  startTime: number;
  started: boolean;
  uploaded: boolean;
}

export interface LessonInfo {
  id: string;
  position: number;
  name: string;
  text: string;
  group: string;
  requirements: {
    wpm: number;
    accuracy: number;
    realAccuracy: number;
  };
}

export interface IScore {
  wpm: number;
  accuracy: number;
  realAccuracy: number;
  timestamp: number;
}

export interface IResult {
  score: IScore;
  progress: number;
}

export interface User {
  id: string;
  email: string;
  token: string;
}

export interface IUserContext {
  user: User | null;
  logout: () => Promise<void>;
}

export type AllLessons = LessonInfo[];
export type UserLessons = { [key: string]: firebase.firestore.DocumentData };

export type Actions =
  | { type: "keydown"; payload: string }
  | { type: "uploaded" }
  | { type: "widthChange"; payload: number[] }
  | { type: "reset"; payload: number[] };

export const StateContext = createContext({} as IState);
export const UserContext = createContext({
  user: null,
  logout: () => {},
} as IUserContext);
