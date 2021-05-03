import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import dummy from './TutorialsDummy.json';

const Title = styled.div`
  padding: 20px;
  width: 70%;
  margin: 150px 150px 0px 300px;
  width: 70%;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
`;
const Date = styled.div`
  margin: 0px 0px 0px 300px;
  padding: 15px;
  border: 3px;
  width: 70%;
  color: gray;
  font-size: 15px;
`;
const Description = styled.div`
  margin: 180px 0px 50px 410px;
  padding: 30px;
  border: 50px;
  width: 60%;
  font-size: 25px;
  font-weight: lighter;
  line-height: 180%;
  background-color: #fffeef;
`;

function Tutorials() {
  const { id } = useParams();
  const tutofilter = dummy.tutoList.find(el => el.id === Number(id));
  return (
    <>
      <Title>{tutofilter.title}</Title>
      <Date>{tutofilter.date}</Date>
      <Description>{tutofilter.description}</Description>
    </>
  );
}

export default Tutorials;
