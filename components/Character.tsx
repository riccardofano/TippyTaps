import { useContext } from "react";
import { StateContext } from "../utils/types";
import styled from "styled-components";

interface StyledCharacterProps {
  position: number;
  currentPosition: number;
  correct: boolean;
  wasIncorrect: boolean;
}

const StyledCharacter = styled.span<StyledCharacterProps>`
  padding: 0 1px;
  margin: 0 1px;
  border-radius: 3px;

  background-color: ${({
    position,
    currentPosition,
    correct,
    wasIncorrect,
  }) => {
    if (position < currentPosition) {
      return correct ? (wasIncorrect ? "#ffd78c" : "#86eda9") : "#ff6e6e";
    }
    return "transparent";
  }};

  ${({ position, currentPosition }) =>
    position === currentPosition &&
    `
    border-bottom: 4px solid blue;
    border-radius: 3px 3px 0 0;
    background-color: rgba(0,0,0,0.05);
  `}
`;

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

  return (
    <StyledCharacter {...{ position, currentPosition, correct, wasIncorrect }}>
      {value}
    </StyledCharacter>
  );
}
