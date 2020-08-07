import { useContext, useState, MouseEvent, createRef, RefObject } from "react";
import styled from "styled-components";

import { UserContext } from "../utils/types";
import FirebaseAuth from "./FirebaseAuth";

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
`;

const Button = styled.button`
  font-size: 16px;
  font-weight: 400;
  padding: 0.2rem 1rem;
  color: #000;
  background: #fff;
  border-radius: 20px;
  border: none;
  box-shadow: 0 3px 14px -5px rgba(0, 0, 0, 0.1);
`;

const LoginButton = styled(Button)`
  color: #fff;
  background: linear-gradient(90deg, #4ba8ec 0%, #0f57c2 100%);
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
          <LoginButton onClick={() => setOpen(true)}>Login</LoginButton>
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
