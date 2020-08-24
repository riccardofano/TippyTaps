import { MouseEvent, createRef, RefObject } from "react";
import styled from "styled-components";
import FirebaseAuth from "./FirebaseAuth";

import { querySize } from "../utils/useMedia";

interface BackgroundProps {
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  ref: RefObject<HTMLDivElement>;
}

const Background = styled.div<BackgroundProps>`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;
  z-index: 1;
`;

const StyledModal = styled.div`
  padding: 2rem;
  min-width: 300px;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.foreground};
  color: ${(props) => props.theme.colors.text};
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  cursor: auto;
  z-index: 2;
`;

const ModalTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSize.mobile.h1};
  font-size: 24px;
  margin: 1rem 0;

  @media ${querySize.medium} {
    font-size: ${(props) => props.theme.fontSize.desktop.h1};
  }
`;

const ModalText = styled.p`
  font-size: ${(props) => props.theme.fontSize.mobile.main};

  @media ${querySize.medium} {
    font-size: ${(props) => props.theme.fontSize.desktop.main};
  }
`;

interface ModalProps {
  setOpen: (arg0: boolean) => void;
  url?: string;
}
export default function Modal({ setOpen, url }: ModalProps) {
  const backgroundRef = createRef<HTMLDivElement>();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (backgroundRef.current === event.target) {
      setOpen(false);
    }
  };

  return (
    <>
      <Background ref={backgroundRef} onClick={handleClick}>
        <StyledModal>
          <ModalTitle>Sign in</ModalTitle>
          <ModalText>
            To upload and see all your scores
            <br />
            and the progress you've made on the lessons!
          </ModalText>
          <FirebaseAuth url={url} />
        </StyledModal>
      </Background>
    </>
  );
}
