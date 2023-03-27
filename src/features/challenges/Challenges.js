// Reference: https://styled-components.com/
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { ChallengeCard } from "../../components/ChallengeCard";
import { useChallengesData } from "./challenges.redux";

const Container = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 24px;
  font-family: "poppins-bold";
`;

const Subheading = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-family: "poppins-bold";
`;

const Instructions = styled.ul`
  margin-bottom: 48px;
`;

const ChallengesContainer = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Challenges = () => {
  const challenges = useChallengesData();
  const state = useSelector((s) => s)
  console.log(state)
  useChallengesData();

  return (
    <Container>
      <Heading>Challenges</Heading>
      <Subheading>Required</Subheading>
      <Instructions>
        <li>
          Display challenge cards according to design spec provided in the
          README
        </li>
        <li>Implement ability to join challenges</li>
        <li>If one challenge is joined, disable ability to join others</li>
      </Instructions>
      <Subheading>Optional</Subheading>
      <Instructions>
        <li>
          Display "loading" state when attempting to join challenge according to
          design specs.
        </li>
      </Instructions>
      <h1>HI USERNAME</h1>
      <p>Take a challenge to earn trees.</p>
      {challenges?.length ? (
        <ChallengesContainer>
          {challenges.map((challenge) => (
            <ChallengeCard challenge={challenge}></ChallengeCard>
          ))}
        </ChallengesContainer>
      ) : (
        <p>retrieving challenges</p>
      )}
    </Container>
  );
};
