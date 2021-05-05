import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HEADER from '../../../utils/Header';
import dummy from './Sections/TutorialsDummy.json';

const CONTENT = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 30px;
  margin-bottom: 100px;
`;

const StyledTitle = styled.div`
  padding: 20px;
  width: 70%;
  margin: 10px;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-size: 28px;
  font-weight: bold;
`;
const StyledDate = styled.div`
  margin-left: auto;
  margin-right: 200px;
  padding: 15px;
  color: gray;
  font-size: 15px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 70%;
  margin: 20px;
`;
const StyledThumbnails = styled.img`
  flex: none;

  width: 300px;
  height: 300px;
`;
const StyledSummary = styled.div`
  flex: none;
  padding: 110px 25px 100px 25px;
  width: 70%;
  font-size: 20px;
  background-color: #fcf9ea;
`;

function TutorialsPage() {
  return (
    <>
      <HEADER>Tutorials</HEADER>
      {dummy.tutoList.map(el => (
        <>
          <Link to={`/tutorials/${el.id}`}>
            <CONTENT>
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
            </CONTENT>
          </Link>
        </>
      ))}
    </>
  );
}

export default TutorialsPage;
