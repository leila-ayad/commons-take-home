import React, {useState} from "react";
import styled from "styled-components";
import LogoAnimation from '../assets/logo/LogoAnimation.gif'
import LogoStatic from "../assets/logo/LogoStatic.png"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  width: 100%;
`;

// const LogoContainer = styled.div`
//   display: flex;
//   padding-right: 30px;
//   justify-content: center;
//   align-items: center;
//   width: 25%;
//   height: 10vh;
//   background-image: url(${LogoStatic});
//   background-size: contain;
//   background-repeat: no-repeat;
//   cursor: pointer;

//   &:hover {
//     background-image: url(${LogoAnimation});
//   }
// `

const Logo = styled.img`
  display: flex;
  margin-left: 80px;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 10vh;
  cursor: pointer;
`
const LogoAnimated = () => {
  const [isPlaying, setIsPlaying] = useState(false)

const handleMouseEnter = () => {
  setIsPlaying(true)
}

const handleMouseLeave = () => {
  setIsPlaying(false)
}

  return (
    <Container>
    <Logo src={LogoAnimation} alt="Commons"
      // onMouseEnter = {handleMouseEnter}
      // onMouseLeave = {handleMouseLeave}
      // style={{ backgroundImage: `url(${isPlaying ? LogoAnimation : LogoStatic})`}}
    />
    </Container>
  );
};

export default LogoAnimated;