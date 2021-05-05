import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import dummy from './TutorialsDummy.json';

const CONTENT = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 30px;
`;

const Title = styled.div`
  padding: 20px;
  width: 70%;
  margin-top: 100px;
  width: 70%;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
`;
const Date = styled.div`
  margin-left: auto;
  margin-right: 200px;
  padding: 15px;
  border: 3px;
  color: gray;
  font-size: 15px;
`;
const Description = styled.div`
  margin: 20px;
  padding: 30px;
  border: 50px;
  width: 70%;
  font-size: 22px;
  font-weight: lighter;
  line-height: 180%;
  background-color: #fffeef;
`;

function Tutorials() {
  const { id } = useParams();
  const tutofilter = dummy.tutoList.find(el => el.id === Number(id));
  return (
    <CONTENT>
      <Title>{tutofilter.title}</Title>
      <Date>{tutofilter.date}</Date>
      <Description>{tutofilter.description}</Description>
    </CONTENT>
  );
}

export default Tutorials;
