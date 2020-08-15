import styled from "styled-components";
import { querySize } from "../utils/useMedia";

export const Button = styled.button<{ margin?: boolean }>`
  font-size: ${(props) => props.theme.fontSize.mobile.main};
  font-weight: 400;
  height: 2em;
  padding-left: 1em;
  padding-right: 1em;
  color: ${(props) => props.theme.colors.text.main};
  background: ${(props) => props.theme.colors.foreground};
  border-radius: ${(props) => props.theme.borderRadius};
  border: none;
  transition: all 100ms ease-in-out;
  transition-property: box-shadow, transform;
  box-shadow: 0 3px 14px -5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-right: ${(props) => (props.margin ? "1rem" : "")};

  &:hover {
    box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }

  &:focus {
    border: solid 2px #4ba8ec;
  }

  &:focus-within {
    outline: none;
  }

  @media ${querySize.medium} {
    font-size: ${(props) => props.theme.fontSize.desktop.main};
  }
`;

export const HighlightButton = styled(Button)`
  color: ${(props) => props.theme.colors.text.highlight};
  background: ${(props) => props.theme.gradient("90deg")};

  &:focus {
    border: solid 2px ${(props) => props.theme.colors.text.main};
  }

  @media ${querySize.medium} {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;
