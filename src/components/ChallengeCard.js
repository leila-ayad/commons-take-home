import React from "react";
import styled from "styled-components";
import Svg from "react-inlinesvg";
import moment from "moment";

import { CHALLENGE_ICONS } from "../constants/challenges";
import { joinChallenge } from "../features/challenges/challenges.redux";

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
  height: 30
})`
  margin-bottom: 16px;
`;

const Title = styled.h3`
  margin-bottom: 24px;
  color: #394152;
  font-family: 'poppins-bold';
`;

const DateRange = styled.p`
  size: 12px;
  color: #676977;
  font-family: 'source-sans-regular';
`;

const Button = styled.button`
  border: none;
  color: white;
  font-weight: bold;
  text-align: center;
  height: 32px;
  width: 120px;
  background-color: #252B36;
  align-self: center;
  font-family: 'poppins-bold';
  position: absolute;
  bottom: 0;
  margin-bottom: 16px;
`;



export const ChallengeCard = ({ challenge }) => {
  const DISPLAY_DATE_FORMAT = "MMMM D, YYYY";

  const iconSrc = CHALLENGE_ICONS[challenge.contentKey];
  const startDate = moment().startOf(challenge.timePeriod).format(DISPLAY_DATE_FORMAT);
  const endDate = moment().endOf(challenge.timePeriod).format(DISPLAY_DATE_FORMAT);



  const join = async () => {
    console.log(challenge.id)
    joinChallenge(challenge.id);
  };

  return (
    <Container>
      <Logo src={iconSrc} />
      <Title>{challenge.name}</Title>
      <DateRange>{startDate} - {endDate}</DateRange>
      <Button onClick={join}>JOIN</Button>
    </Container>
  )
} 