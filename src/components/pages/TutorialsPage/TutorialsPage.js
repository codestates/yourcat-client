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
  &:hover {
    color: #badfdb;
  }
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
  display: flex;
  padding: 0 30px;
  width: 70%;
  height: 300px;
  justify-content: center;
  align-items: center;
  background-color: #fcf9ea;
`;

const Summary = styled.div`
  font-size: 20px;
  line-height: 180%;
`;

function TutorialsPage() {
  return (
    <>
      <HEADER>알쓸냥잡</HEADER>
      {dummy.tutoList.map(el => (
        <>
          <Link to={`/tutorials/${el.id}`}>
            <CONTENT>
              <StyledTitle key={el.title}>{el.title}</StyledTitle>
              <StyledDate key={el.date}>{el.date}</StyledDate>
              <Div>
                <StyledThumbnails key={el.id} src={el.thumbnails}>
                  {}
                </StyledThumbnails>
                <StyledSummary key={el.summary}>
                  <Summary>{el.summary}</Summary>
                </StyledSummary>
              </Div>
            </CONTENT>
          </Link>
        </>
      ))}
    </>
  );
}

export default TutorialsPage;
