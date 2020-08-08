import styled from "styled-components";
import { querySize } from "../utils/useMedia";

export const Button = styled.button`
  font-size: 16px;
  font-weight: 400;
  padding: 0.2rem 1rem;
  color: #000;
  background: #fff;
  border-radius: 20px;
  border: none;
  box-shadow: 0 3px 14px -5px rgba(0, 0, 0, 0.1);

  @media ${querySize.medium} {
    padding: 0.2rem 3rem;
    font-size: 20px;
  }
`;

export const HighlightButton = styled(Button)`
  color: #fff;
  background: linear-gradient(90deg, #4ba8ec 0%, #0f57c2 100%);
`;
