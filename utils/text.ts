import { ICharacter, IState } from "./types";

export const buildLines = (
  chars: ICharacter[],
  limit = 30
): [ICharacter[][], number[]] => {
  let length = 0;
  let totalLength = 0;
  let charArray = [...chars];
  let lines: ICharacter[][] = [];
  let lengths: number[] = [];

  while (length < charArray.length) {
    // the length is over the character limit and it's between words
    if (length >= limit && charArray[length].value === " ") {
      // add the characters you've seen
      lines.push(charArray.splice(0, length + 1));
      totalLength += length + 1;
      lengths.push(totalLength);
      length = 0;
    }
    length += 1;
  }
  // add the rest of the characters
  lines.push(charArray);
  lengths.push(totalLength + length);

  return [lines, lengths];
};

export const findCurrentLine = (
  position: number,
  lineLengths: number[]
): number => {
  let line = 0;
  for (let i = 1; i < lineLengths.length; i++) {
    if (position < lineLengths[i]) {
      line = i;
      break;
    }
  }
  return line;
};

const buildCharacters = (text: string): ICharacter[] =>
  text.split("").map((c, i) => ({
    value: c,
    position: i,
    correct: false,
    wasIncorrect: false,
  }));

export const initializeState = (text: string): IState => {
  const characters = buildCharacters(text);

  return {
    text,
    characters,
    lineLengths: [],
    currentLine: 0,
    currentPosition: 0,
    totalKeyPresses: 0,
    startTime: 0,
    started: false,
    uploaded: false,
  };
};
