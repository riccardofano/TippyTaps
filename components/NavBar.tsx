import { useContext, useState, MouseEvent, createRef, RefObject } from "react";
import Link from "next/link";
import styled from "styled-components";

import { UserContext } from "../utils/types";
import { querySize } from "../utils/useMedia";
import FirebaseAuth from "./FirebaseAuth";
import { Button, HighlightButton } from "./Buttons";
import { ThemeToggle } from "../pages/_app";

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

const Logo = styled.a`
  font-size: ${(props) => props.theme.fontSize.mobile.h1};
  font-weight: bold;
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  transition: transform 100ms ease-in;

  &:hover {
    transform: translateY(-3px);
  }

  @media ${querySize.medium} {
    font-size: ${(props) => props.theme.fontSize.desktop.h1};
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
  const { toggle } = useContext(ThemeToggle);
  const [open, setOpen] = useState(false);
  const backgroundRef = createRef<HTMLDivElement>();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (backgroundRef.current === event.target) {
      setOpen(false);
    }
  };

  return (
    <StyledNavBar>
      <Link href="/">
        <Logo>TippyTaps</Logo>
      </Link>
      <Button onClick={toggle}>Change theme</Button>
      {user ? (
        <Button onClick={() => logout()}>Logout</Button>
      ) : (
        <>
          <HighlightButton onClick={() => setOpen(true)}>Login</HighlightButton>
          {open && (
            <Background ref={backgroundRef} onClick={handleClick}>
              <Modal>
                <ModalTitle>Sign in</ModalTitle>
                <ModalText>
                  To upload and see all your scores
                  <br />
                  and the progress you've made on the lessons!
                </ModalText>
                <FirebaseAuth url={url} />
              </Modal>
            </Background>
          )}
        </>
      )}
    </StyledNavBar>
  );
}
