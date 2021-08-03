import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BIGBOX = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 30px;
  margin-bottom: 40px;
`;

const CATEGORY = styled('div')`
  color: #badfdb;
  font-size: 25px;
  margin-left: 5px;
`;

const CategoryBOX = styled.div`
  width: 70%;
  padding: 10px;
  padding-bottom: 20px;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.09);
`;

const LIST = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 0;
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
    font-weight: 400;
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

function CommunityBookMark({ data, division }) {
  return (
    <BIGBOX>
      <CategoryBOX>
        <CATEGORY>{division}</CATEGORY>
      </CategoryBOX>
      <div style={{ width: '70%' }}>
        {data.map(bookmark => {
          const { contentId, title, userName } = bookmark;
          return (
            <Link to={`community/detail/${contentId}`} key={contentId}>
              <LIST key={contentId}>
                <TITLE>{title}</TITLE>
                <WRITER>{userName}</WRITER>
              </LIST>
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
