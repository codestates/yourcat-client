import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ErrContent from './ErrContent';
import catImage from '../../images/errorCat.png';

const CAT = styled('img')`
  width: 100%;
  margin-bottom: 10px;
`;

CAT.defaultProps = {
  src: catImage,
};

const Wrapper = styled.div`
  width: 100%;
  height: 200%;
  background-color: rgb(0, 0, 0, 0);
  background-color: rgb(0, 0, 0, 0.2);
  position: fixed;
  margin: auto;
  top: 0;
  z-index: 11;
  display: ${props => (props.view ? 'block' : 'none')};
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 350px;
  height: auto;
  border-radius: 5px;
  background-color: #badfdb;
  align-items: center;
  color: white;
`;
const MainChild = styled(ErrContent)`
  padding-top: 100px;
`;

export default function ErrModal() {
  const {
    userModal: { errorModal },
    errorModalMessage: { message },
  } = useSelector(state => state);
  return (
    <Wrapper view={errorModal}>
      <Main>
        <CAT />
        {message}
        <MainChild />
      </Main>
    </Wrapper>
  );
}
