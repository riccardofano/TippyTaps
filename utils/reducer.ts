import { IState, Actions } from "./types";

export const reducer = (draft: IState, action: Actions): IState => {
  switch (action.type) {
    case "keydown": {
      // don't handle event if we're at the end of the text
      if (draft.text.length === draft.currentPosition) return draft;

      const key = action.payload;
      // User is trying to correct an error, go back in position
      if (key === "Backspace" || key === "Delete") {
        draft.currentPosition > 0 ? (draft.currentPosition -= 1) : 0;
        if (
          draft.currentLine > 0 &&
          draft.currentPosition + 1 === draft.lineLengths[draft.currentLine - 1]
        ) {
          draft.currentLine -= 1;
        }
        return draft;
      }

      // Start the time!
      if (!draft.started) {
        draft.started = true;
        draft.startTime = Date.now();
      }

      // Is the key correct?
      if (key === draft.text[draft.currentPosition]) {
        draft.characters[draft.currentPosition].correct = true;
      } else {
        draft.characters[draft.currentPosition].correct = false;
        draft.characters[draft.currentPosition].wasIncorrect = true;
      }

      draft.totalKeyPresses += 1;
      draft.currentPosition += 1;

      // Scroll down to the next line
      // if the next position is the length of the current line + 1
      // and if it's not the last 2 lines
      if (
        draft.currentPosition + 1 ===
          draft.lineLengths[draft.currentLine] + 1 &&
        draft.currentLine + 2 !== draft.lineLengths.length
      ) {
        draft.currentLine += 1;
      }

      return draft;
    }
    default: {
      return draft;
    }
  }
};
