import { useContext, useState } from "react";
import Link from "next/link";
import styled from "styled-components";

import { InlineIcon } from "@iconify/react";
import moon from "@iconify/icons-oi/moon";
import sun from "@iconify/icons-oi/sun";

import { UserContext, ThemeContext } from "../utils/types";
import { querySize } from "../utils/useMedia";
import { Button, HighlightButton } from "./Buttons";
import Modal from "../components/Modal";

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
  const { toggle, theme } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);

  return (
    <StyledNavBar>
      <Link href="/">
        <Logo>TippyTaps</Logo>
      </Link>
      <div>
        {theme === "light" ? (
          <Button margin onClick={toggle} aria-label="Switch to light theme">
            <InlineIcon icon={moon} />
          </Button>
        ) : (
          <Button margin onClick={toggle} aria-label="Switch to dark theme">
            <InlineIcon icon={sun} />
          </Button>
        )}
        {user ? (
          <Button onClick={() => logout()}>Logout</Button>
        ) : (
          <HighlightButton onClick={() => setOpen(true)}>Login</HighlightButton>
        )}
      </div>
      {open && <Modal setOpen={setOpen} url={url} />}
    </StyledNavBar>
  );
}
