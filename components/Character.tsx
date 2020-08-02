import { useContext } from "react";
import { StateContext } from "../utils/types";

interface CharacterProps {
  position: number;
  value: string;
}

export default function Character({ position, value }: CharacterProps) {
  const { currentPosition, characters } = useContext(StateContext);
  const { correct, wasIncorrect } = characters[position];

  let style = {
    backgroundColor: correct
      ? wasIncorrect
        ? "#ffd78c"
        : "#86EDA9"
      : "#ff6e6e",
  };

  style =
    currentPosition <= position ? { backgroundColor: "transparent" } : style;

  return <span style={style}>{value}</span>;
}
