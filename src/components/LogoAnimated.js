import React from "react";
import styled from "styled-components";
import LogoAnimation from "../assets/logo/LogoAnimation.gif";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  width: 100%;
`;

const Logo = styled.img`
  display: flex;
  margin-left: 80px;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 10vh;
  cursor: pointer;
`;
const LogoAnimated = () => {
  return (
    <Container>
      <Logo src={LogoAnimation} alt="Commons" />
    </Container>
  );
};

export default LogoAnimated;
