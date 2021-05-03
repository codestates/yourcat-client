import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MultiStepForm from './MultiStepForm';

const Wrapper = styled.div`
  width: 100%;
  height: 200%;
  background-color: rgb(0, 0, 0, 0);
  background-color: rgb(0, 0, 0, 0.2);
  position: fixed;
  margin: auto;
  top: 0;
  z-index: 1;
  display: ${props => (props.view ? 'block' : 'none')};
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 420px;
  height: 500px;
  border-radius: 5px;
  background-color: #fcf9ea;
  align-items: center;
`;
const MainChild = styled(MultiStepForm)`
  padding-top: 100px;
`;
export default function LoginModal() {
  const {
    userModal: { loginModal },
  } = useSelector(state => state);
  return (
    <Wrapper view={loginModal}>
      <Main>
        <MainChild />
      </Main>
    </Wrapper>
  );
}
