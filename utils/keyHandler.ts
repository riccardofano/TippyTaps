import { Dispatch } from "react";
import { Actions } from "./types";

const ignoredKeys = [
  "AltGraph",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "CapsLock",
  "Dead",
  "End",
  "Esc",
  "Escape",
  "F1",
  "F10",
  "F11",
  "F12",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "Fn",
  "FnLock",
  "Home",
  "Hyper",
  "Meta",
  "NumLock",
  "OS",
  "PageDown",
  "PageUp",
  "ScrollLock",
  "Shift",
  "Super",
  "Symbol",
  "SymbolLock",
  "Tab",
  "Unidentified",
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
      default: {
        dispatch({ type: "keydown", payload: e.key });
        break;
      }
    }
  }
};
