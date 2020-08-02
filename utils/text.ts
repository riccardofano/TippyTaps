import { ICharacter, IState } from "./types";

const buildLines = (
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

const buildCharacters = (text: string): ICharacter[] =>
  text.split("").map((c, i) => ({
    value: c,
    position: i,
    correct: false,
    wasIncorrect: false,
  }));

export const initializeState = (
  text: string,
  limit: number
): { initialState: IState; lines: ICharacter[][] } => {
  const characters = buildCharacters(text);
  const [lines, lengths] = buildLines(characters, limit);

  return {
    initialState: {
      text,
      characters,
      lineLengths: lengths,
      currentLine: 0,
      currentPosition: 0,
      startTime: 0,
      started: false,
      totalKeyPresses: 0,
    },
    lines,
  };
};
