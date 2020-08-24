import { useState, useContext } from "react";
import styled from "styled-components";
import Link from "next/link";

import Modal from "../components/Modal";
import { Button, HighlightButton } from "../components/Buttons";

import { UserContext } from "../utils/types";
import { querySize } from "../utils/useMedia";

const StyledHomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(
      90deg,
      rgba(15, 87, 194, 0.5),
      rgba(75, 168, 236, 0.5)
    );
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url("hero.jpg");
    background-position: center;
    background-size: cover;
    z-index: -2;
  }
`;

const Title = styled.h1`
  font-size: 35px;
  margin: 15vh 0 1rem;

  @media ${querySize.medium} {
    font-size: 50px;
  }
`;

const Description = styled.p`
  max-width: 600px;
  font-weight: 300;
  font-size: 20px;
  margin: 0 0 2rem;

  @media ${querySize.medium} {
    font-size: 25px;
    margin-bottom: 3rem;
  }
`;

export default function HomeContainer() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  return (
    <StyledHomeContainer>
      <Title>TippyTaps</Title>
      <Description>
        Improve your typing skills with a ton of free lessons. Login to upload
        your scores!
      </Description>
      <div>
        <Link href="/lessons">
          <a>
            <Button margin>Go to lessons</Button>
          </a>
        </Link>
        {!user && (
          <HighlightButton onClick={() => setOpen(true)}>Login</HighlightButton>
        )}
      </div>
      {open && <Modal setOpen={setOpen} url={"/lessons"} />}
    </StyledHomeContainer>
  );
}
