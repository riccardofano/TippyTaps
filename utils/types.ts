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
}

export type Actions = { type: "keydown"; payload: string };
export const StateContext = createContext({} as IState);
