import React from 'react';
import styled from 'styled-components';
import NavBar from './Sections/NavBar';
import BlackCat from '../../../images/blackCat.png';

const CatImg = styled('img')`
  width: 33%;
`;

CatImg.defaultProps = {
  src: BlackCat,
};

const CatBox = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding-top: 120px;
`;

const Box = styled('div')`
  border: 1px solid black;
  height: 300px;
`;

const MintBox = styled('div')`
  background-color: #badfdb;
  height: 300px;
`;

const YellowBox = styled('div')`
  background-color: #fcf9ea;
  height: 300px;
`;

const OrangeBox = styled('div')`
  background-color: #ffc5a1;
  height: 300px;
`;

const TextBox = styled('div')`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WelcomeTitle = styled('h1')`
  font-weight: 700;
  margin: 15px;
`;
const WelcomeDesc = styled('p')`
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  margin: 15px;
`;

export default function LandingPage() {
  return (
    <div>
      <NavBar />
      <Box>
        <MintBox>
          <CatBox>
            <CatImg />
          </CatBox>
        </MintBox>
      </Box>
      <TextBox>
        <WelcomeTitle>Your Cat</WelcomeTitle>
        <WelcomeDesc>
          Your Cat is all about cat.
          <br />
          You can chat with other cat caregivers.
          <br />
          Also, you can get useful information about cats.
          <br />
          Do you want to show your cat to others?
        </WelcomeDesc>
      </TextBox>
      <Box>
        <YellowBox>3</YellowBox>
      </Box>
      <Box>
        <OrangeBox>4</OrangeBox>
      </Box>
    </div>
  );
}
