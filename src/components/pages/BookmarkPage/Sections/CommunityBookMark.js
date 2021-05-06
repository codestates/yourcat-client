import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BIGBOX = styled('div')`
  display: flex;
  justify-content: center;

  flex-direction: column;
  margin: 0 30px;
  margin-bottom: 40px;
`;

const CATEGORY = styled('div')`
  margin: 10px 200px;
  margin-top: 80px;
  margin-bottom: 10px;
  color: #badfdb;
  font-size: 25px;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.09);
  padding: 10px;
  padding-bottom: 20px;
`;

const LIST = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  width: 70%;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
`;

const TITLE = styled.div`
  padding: 10px;
  width: 70%;
  background: rgba(0, 0, 0, 0.003);
  font-weight: 300;
  font-size: 21px;
  text-align: center;
  &:hover {
    color: #f8a978;
  }
`;

const WRITER = styled.div`
  padding: 10px;
  width: 30%;
  background: rgba(0, 0, 0, 0.003);
  font-weight: 300;
  font-size: 21px;
  text-align: center;
`;

const CONTENT = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

function CommunityBookMark({ data, division }) {
  return (
    <BIGBOX>
      <CATEGORY>{division}</CATEGORY>
      <div>
        {data.map(bookmark => {
          const { contentId, title, userName } = bookmark;
          return (
            <Link to={`community/detail/${contentId}`} key={contentId}>
              <CONTENT>
                <LIST key={contentId}>
                  <TITLE>{title}</TITLE>
                  <WRITER>{userName}</WRITER>
                </LIST>
              </CONTENT>
            </Link>
          );
        })}
      </div>
    </BIGBOX>
  );
}
CommunityBookMark.propTypes = {
  data: propTypes.arrayOf(propTypes.object).isRequired,
  division: propTypes.string.isRequired,
};
export default CommunityBookMark;
