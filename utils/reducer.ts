import { IState, Actions } from "./types";

export const reducer = (draft: IState, action: Actions): IState => {
  switch (action.type) {
    case "keydown": {
      // don't handle event if we're at the end of the text
      if (draft.text.length === draft.currentPosition) return draft;

      const key = action.payload;

      // Is the key correct?
      if (key === draft.text[draft.currentPosition]) {
        draft.characters[draft.currentPosition].correct = true;
      } else {
        draft.characters[draft.currentPosition].correct = false;
        draft.characters[draft.currentPosition].wasIncorrect = true;
      }

      draft.currentPosition += 1;
      return draft;
    }
    default: {
      return draft;
    }
  }
};
