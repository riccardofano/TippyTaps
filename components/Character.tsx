import { useContext } from "react";
import { StateContext } from "../utils/types";
import styled from "styled-components";
import { InlineIcon } from "@iconify/react";
import share from "@iconify/icons-oi/share";

const EnterIcon = styled(InlineIcon)`
  font-size: 0.8em;
  padding: 2px 1px;
  transform: rotate(180deg) !important;
`;

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
    theme,
  }) => {
    if (position < currentPosition) {
      return correct
        ? wasIncorrect
          ? theme.colors.tiles.fixed
          : theme.colors.tiles.correct
        : theme.colors.tiles.incorrect;
    }
    return "transparent";
  }};

  ${({ position, currentPosition, theme }) =>
    position === currentPosition &&
    `
    border-bottom: 4px solid ${theme.colors.tiles.cursor};
    border-radius: 3px 3px 0 0;
    background-color: ${theme.colors.tiles.current};
  `}
`;

interface CharacterProps {
  position: number;
  value: string;
}

export default function Character({ position, value }: CharacterProps) {
  const { currentPosition, characters } = useContext(StateContext);
  const { correct, wasIncorrect } = characters[position];

  return (
    <StyledCharacter {...{ position, currentPosition, correct, wasIncorrect }}>
      {value === "\n" ? <EnterIcon icon={share} /> : value}
    </StyledCharacter>
  );
}
