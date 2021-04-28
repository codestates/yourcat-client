import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dummy from './TutorialsDummy.json';

const StyledTitle = styled.div`
  padding: 20px;
  width: 70%;
  color: Black;
  font-size: 30px;
  font-weight: bold;
  background-color: #e8f5e9;
`;
const StyledDate = styled.div`
  padding: 15px 15px 15px 30px;
  border: 3px;
  width: 70%;
  color: gray;
  font-size: 15px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledThumbnails = styled.img`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 250px;
  height: 250px;
`;
const StyledSummary = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 25px 25px 25px;
  border: 3px;
  width: 70%;
  color: black;
  background-color: #ffebee;
`;

function TutorialsPage() {
  return (
    <>
      {dummy.tutoList.map(el => (
        <>
          <StyledTitle key={el.title}>
            <Link to={`/tutorials/${el.id}`}>{el.title}</Link>
          </StyledTitle>
          <StyledDate key={el.date}>{el.date}</StyledDate>
          <Div>
            <StyledThumbnails
              key={el.id}
              src={`http://placekitten.com/g/300/30${el.id}`}
            >
              {}
            </StyledThumbnails>
            <StyledSummary key={el.summary}>{el.summary}</StyledSummary>
          </Div>
        </>
      ))}
    </>
  );
}

export default TutorialsPage;
