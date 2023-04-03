import React from "react";
import styled from "styled-components";
import Svg from "react-inlinesvg";
import moment from "moment";
import { useDispatch } from "react-redux";

import { CHALLENGE_ICONS } from "../constants/challenges";
import { joinChallenge } from "../features/challenges/challenges.redux";
import { AiOutlineCheck } from "react-icons/ai"

const Container = styled.div`
  width: 155px;
  height: 282px;
  margin-right: 24px;
  margin-bottom: 16px;
  background-color: white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Logo = styled(Svg).attrs({
  width: 30,
  height: 30,
})`
  margin-bottom: 16px;
`;

const Title = styled.h3`
  margin-bottom: 24px;
  color: #394152;
  font-family: "poppins-bold";
`;

const DateRange = styled.p`
  size: 12px;
  color: #676977;
  font-family: "source-sans-regular";
`;

const Button = styled.button`
  border: none;
  color: white;
  font-weight: bold;
  text-align: center;
  height: 32px;
  width: 120px;
  background-color: #252b36;
  align-self: center;
  font-family: "poppins-bold";
  position: absolute;
  bottom: 0;
  margin-bottom: 16px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ChallengeCard = ({ challenge, joined, onJoin }) => {
  const dispatch = useDispatch();

  const DISPLAY_DATE_FORMAT = "MMMM D, YYYY";

  const iconSrc = CHALLENGE_ICONS[challenge.contentKey];
  const startDate = moment()
    .startOf(challenge.timePeriod)
    .format(DISPLAY_DATE_FORMAT);
  const endDate = moment()
    .endOf(challenge.timePeriod)
    .format(DISPLAY_DATE_FORMAT);

  const join = async () => {
    dispatch(joinChallenge(challenge.id, onSuccess, onFailure));
  };

  const onSuccess = (response) => {
    console.log("Success: ", response);
    onJoin(challenge.id);
  };

  const onFailure = (error) => {
    console.log("Failure: ", error);
  };

  return (
    <Container>
      <Logo src={iconSrc} />
      <Title>{challenge.name}</Title>
      <DateRange>
        {startDate} - {endDate}
      </DateRange>
      {joined ? (
        <Button onClick={join} disabled={joined === challenge.id ? false : true}>
          {joined === challenge.id ? <AiOutlineCheck/> :  `Join`}
        </Button>
      ) : (
        <Button onClick={join}>Join</Button>
      )}
    </Container>
  );
};
