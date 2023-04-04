// Reference: https://styled-components.com/
import { useState } from "react";

import styled from "styled-components";

import { ChallengeCard } from "../../components/ChallengeCard";
import { useChallengesData } from "./challenges.redux";

const Container = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
`;

const ChallengesContainer = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Challenges = () => {
  const [joinedIndex, setJoinedIndex] = useState(null);

  const challenges = useChallengesData();
  console.log(challenges)

  //fetch currentUser data from localStorage
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const currentUser = getUser();

  return (
    <Container>
      <h1>Hi {currentUser.firstName}</h1>
      <p>Take a challenge to earn trees.</p>
      {challenges?.length ? (
        <ChallengesContainer>
          {challenges.map((challenge) => (
            <ChallengeCard
              challenge={challenge}
              joined={joinedIndex}
              onJoin={() => setJoinedIndex(challenge.id)}
            ></ChallengeCard>
          ))}
        </ChallengesContainer>
      ) : (
        <p data-testid="loading">Retrieving Challenges...</p>
      )}
    </Container>
  );
};
