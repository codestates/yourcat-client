import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dummy from './Sections/TutorialsDummy.json';

const StyledTitle = styled.div`
  padding: 20px;
  width: 70%;
  margin: 150px 150px 0px 300px;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-size: 30px;
  font-weight: bold;
`;
const StyledDate = styled.div`
  padding: 15px 15px 15px 30px;
  margin: 0px 0px 0px 300px;
  border: 3px;
  width: 70%;
  color: gray;
  font-size: 15px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  margin: 0px 0px 0px 400px;
`;
const StyledThumbnails = styled.img`
  flex: none;
  padding: 20px;
  width: 300px;
  height: 300px;
  box-shadow: inset 0 -2px 6px #ffc5a1;
`;
const StyledSummary = styled.div`
  flex: none;
  padding: 110px 25px 100px 25px;
  border: 3px;
  width: 63%;
  font-size: 20px;
  background-color: #fcf9ea;
`;

function TutorialsPage() {
  return (
    <>
      {dummy.tutoList.map(el => (
        <>
          <Link to={`/tutorials/${el.id}`}>
            <StyledTitle key={el.title}>{el.title}</StyledTitle>
            <StyledDate key={el.date}>{el.date}</StyledDate>
            <Div>
              <StyledThumbnails
                key={el.id}
                src={`http://placekitten.com/300/30${el.id}`}
              >
                {}
              </StyledThumbnails>
              <StyledSummary key={el.summary}>{el.summary}</StyledSummary>
            </Div>
          </Link>
        </>
      ))}
    </>
  );
}

export default TutorialsPage;
