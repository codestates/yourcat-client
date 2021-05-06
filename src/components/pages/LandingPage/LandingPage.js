import React from 'react';
import styled, { keyframes } from 'styled-components';
import BlackCat from '../../../images/blackCat.png';
import pageImage from '../../../images/mainCalculator.png';
import tutorialsImg from '../../../images/tutorialsImg.png';
import communityImg from '../../../images/communityImg.png';
import catphotoImg from '../../../images/catphotoImg.png';
import calculatorImg from '../../../images/calculatorImg.png';
import bookmarkImg from '../../../images/bookmarkImg.png';

const TextFade = keyframes`
  from{
    transform: translatey(0px);
  }
  to{
    transform: translatey(-30px);
  }`;

const CatWalk = keyframes`
  0% {
    transform: translateX(-30vw);
    opacity: 0.5;
    
  }
  100% {
    transform: none;
    opacity: 1;
  }`;

const CatImg = styled('img')`
  width: 30%;
  animation: ${CatWalk} 3.5s ease-in-out;
  margin-top: auto;
  margin-bottom: 0;
`;

CatImg.defaultProps = {
  src: BlackCat,
};

const IMG = styled('img')`
  width: 40%;
`;

IMG.defaultProps = {
  src: pageImage,
};

const TutoIMG = styled('img')`
  width: 40%;
  animation: ${TextFade} 1s infinite ease-in-out alternate;
`;

TutoIMG.defaultProps = {
  src: tutorialsImg,
};

const CommuImg = styled('img')`
  width: 40%;
  animation: ${TextFade} 1s infinite ease-in-out alternate;
`;

CommuImg.defaultProps = {
  src: communityImg,
};

const CatPhotoImg = styled('img')`
  width: 40%;
  animation: ${TextFade} 1s infinite ease-in-out alternate;
`;

CatPhotoImg.defaultProps = {
  src: catphotoImg,
};

const BookImg = styled('img')`
  width: 40%;
  animation: ${TextFade} 1s infinite ease-in-out alternate;
`;

BookImg.defaultProps = {
  src: bookmarkImg,
};

const CalImg = styled('img')`
  width: 40%;
  animation: ${TextFade} 1s infinite ease-in-out alternate;
`;

CalImg.defaultProps = {
  src: calculatorImg,
};

const Container = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 500px;
`;

const CatBox = styled('div')`
  display: flex;
  justify-content: center;
  bottom: 10px;
  background-color: #badfdb;
  height: 50vh;
`;

const Box = styled('div')`
  height: 50vh;
`;

const YellowBox = styled('div')`
  background-color: #fcf9ea;
  height: 300px;
`;

const OrangeBox = styled('div')`
  background-color: #ffc5a1;
  height: 300px;
`;

const MainTextBox = styled('div')`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LeftTextBox = styled('div')`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RightTextBox = styled('div')`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;

  animation-delay: 2s;
`;

const WelcomeTitle = styled('h1')`
  font-weight: 700;
  margin: 15px;
  margin-bottom: 30px;
`;

const RightTitle = styled('h1')`
  font-weight: 700;
  margin: 15px;
  margin-bottom: 30px;

  text-align: right;
  width: 92%;
`;

const WelcomeDesc = styled('p')`
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  margin: 15px;
`;

const LeftDesc = styled('p')`
  color: rgba(0, 0, 0, 0.5);
  margin: 15px;
  text-align: left;
`;

const RightDesc = styled('p')`
  color: rgba(0, 0, 0, 0.5);
  margin: 15px;
  right: 10px;
  text-align: right;
`;

export default function LandingPage() {
  return (
    <div>
      <Box>
        <CatBox>
          <CatImg />
        </CatBox>
      </Box>
      <MainTextBox>
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
      </MainTextBox>
      <YellowBox />
      <Container>
        <LeftTextBox>
          <WelcomeTitle>Tutorials</WelcomeTitle>
          <LeftDesc>
            고양이의 건강, 행동, 생활 팁 등 다양한 지식들을 찾으시나요? <br />
            <br />
            초보 집사님부터 전문가 집사님까지 모두에게 좋은 정보들이 여기에
            있습니다!
          </LeftDesc>
        </LeftTextBox>
        <TutoIMG />
      </Container>

      <OrangeBox />

      <Container>
        <CommuImg />
        <RightTextBox>
          <RightTitle>Community</RightTitle>
          <RightDesc>
            사람들과 함께 고양이와의 일상을 공유해보세요! <br />
            <br />
            좋은 일이나 나쁜 일 궁금한 점을
            <br />
            <br /> 같이 고민하고 같이 기뻐해 줄 집사들이 기다리고 있습니다!{' '}
            <br />
            <br />
            마음에 드는 글을 저장해서 편하게 관리할 수 있습니다. <br />
            <br />
            모두가 봤으면 하는 글이 있다면 추천해주세요!
          </RightDesc>
        </RightTextBox>
      </Container>

      <YellowBox />
      <Container>
        <LeftTextBox>
          <WelcomeTitle>Photo</WelcomeTitle>
          <LeftDesc>
            고양이와 함께한 순간 순간을 기록하고 공유하세요! <br />
            <br />
            어떠한 글도 필요없습니다.
            <br />
            <br /> 오직 사진만으로 고양이를 사랑하는 많은 사람들과 소통하세요.{' '}
            <br />
            <br />
            당신의 고양이를 사랑해 줄 많은 집사들이 기다리고 있습니다.
            <br />
            <br /> your cat? our cat!
          </LeftDesc>
        </LeftTextBox>
        <CatPhotoImg />
      </Container>
      <OrangeBox />
      <Container>
        <CalImg />
        <RightTextBox>
          <RightTitle>Calculator</RightTitle>
          <RightDesc>
            우리 고양이에게 사료를 얼마나 줘야 할 지 고민이시라구요? <br />
            <br />
            집사님들이 알기 쉽게 숟가락으로 급여량을 알려 드립니다.
          </RightDesc>
        </RightTextBox>
      </Container>
      <YellowBox />
      <Container>
        <LeftTextBox>
          <WelcomeTitle>Bookmark</WelcomeTitle>
          <LeftDesc>
            포토 페이지에서 마음에 드는 사진이 있다구요? <br />
            <br />
            저장해두고 계속 보고싶은 글이 있나요?
            <br />
            <br />
            북마크 기능을 이용해 보세요! <br />
            <br />
            사이드바의 북마크에서 내가 저장한 사진과 글을 볼 수 있습니다.
          </LeftDesc>
        </LeftTextBox>
        <BookImg />
      </Container>
    </div>
  );
}
