import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import dummy from './TutorialsDummy.json';

const Title = styled.div`
  margin: 15px;
  padding: 30px;
  border: 50px;
  width: 70%;
  font-size: 45px;
  font-weight: bold;
  text-align: center;
  background-color: #e8f5e9;
`;
const Date = styled.div`
  margin: 20px;
  padding: 15px;
  border: 3px;
  width: 70%;
  color: gray;
  font-size: 15px;
  display: block;
`;
const Description = styled.div`
  margin: 15px;
  padding: 30px;
  border: 50px;
  width: 70%;
  color: black;
  background-color: #ffebee;
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
