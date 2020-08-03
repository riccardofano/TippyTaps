import { Dispatch } from "react";
import { Actions } from "./types";

const ignoredKeys = [
  "AltGraph",
  "CapsLock",
  "Dead",
  "Fn",
  "FnLock",
  "Hyper",
  "Meta",
  "NumLock",
  "OS",
  "ScrollLock",
  "Shift",
  "Super",
  "Symbol",
  "SymbolLock",
  "Unidentified",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  "Esc",
  "Escape",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
];

export const keyHandler = (e: KeyboardEvent, dispatch: Dispatch<Actions>) => {
  if (
    !(
      ignoredKeys.find((k) => k === e.key) ||
      e.getModifierState("Control") ||
      e.getModifierState("Alt")
    )
  ) {
    e.preventDefault();
    switch (e.key) {
      case "Enter": {
        dispatch({ type: "keydown", payload: "\n" });
        break;
      }
      case "Tab": {
        dispatch({ type: "keydown", payload: "\t" });
        break;
      }
      default: {
        dispatch({ type: "keydown", payload: e.key });
        break;
      }
    }
  }
};
