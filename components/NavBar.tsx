import { useContext, useState, MouseEvent, createRef, RefObject } from "react";
import styled from "styled-components";

import { UserContext } from "../utils/types";
import { querySize } from "../utils/useMedia";
import FirebaseAuth from "./FirebaseAuth";
import { Button, HighlightButton } from "./Buttons";

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
`;

const Modal = styled.div`
  padding: 2rem;
  border-radius: 3px;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: auto;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;

  @media ${querySize.medium} {
    font-size: 28px;
  }
`;

const StyledNavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0;
`;

interface NavbarProps {
  url?: string;
}

export default function Navbar({ url }: NavbarProps) {
  const { user, logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const backgroundRef = createRef<HTMLDivElement>();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (backgroundRef.current === event.target) {
      setOpen(false);
    }
  };

  return (
    <StyledNavBar>
      <Logo>TippyTaps</Logo>
      {user ? (
        <Button onClick={() => logout()}>Logout</Button>
      ) : (
        <>
          <HighlightButton onClick={() => setOpen(true)}>Login</HighlightButton>
          {open && (
            <Background ref={backgroundRef} onClick={handleClick}>
              <Modal>
                <p>Sign in</p>
                <FirebaseAuth url={url} />
              </Modal>
            </Background>
          )}
        </>
      )}
    </StyledNavBar>
  );
}
