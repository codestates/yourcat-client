import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CommunityBookMark({ data, division }) {
  return (
    <div>
      <h1>{division}</h1>
      <ul>
        {data.map(bookmark => {
          const { _id, title, userId } = bookmark;
          const author = userId.nickname;
          return (
            <Link to={`community/detail/${_id}`} key={_id}>
              <li key={_id}>
                <span>{title}</span>
                <sapp>{author}</sapp>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
CommunityBookMark.propTypes = {
  data: propTypes.arrayOf(propTypes.object).isRequired,
  division: propTypes.string.isRequired,
};
export default CommunityBookMark;
