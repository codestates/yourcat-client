import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import propTypes from 'prop-types';

const Writer = styled('h6')`
  padding: 5px;
  color: grey;
`;

const Content = styled('h4')`
  padding: 5px;
`;

const Button = styled('button')`
  margin: 0 10px;
`;

function SingleComment(props) {
  const [commentValue, setCommentValue] = useState('');
  const [editComment, setEditComment] = useState(false);
  const { comment, commentUser } = props;

  const handleChange = event => {
    setCommentValue(event.currentTarget.value);
  };

  const handleEditComment = () => {
    setEditComment(!editComment);
  };

  const onSubmit = event => {
    event.preventDefault();

    const variables = {
      description: commentValue,
    };

    const url =
      'http://localhost:4000/contents/addcomment/608e665af74f883c54bc72e2';

    const config = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDhlNjU3ZmY3NGY4ODNjNTRiYzcyZTEiLCJpYXQiOjE2MTk5NDQ5MTEsImV4cCI6MTYxOTk1NTcxMX0.EXPkFMz1iyY2xp86d_EGKRLWrgSKpLFLv49k3TMjtFY',
      },
    };

    axios
      .patch(url, variables, config)
      .then(response => {
        if (response) {
          console.log(response);
        } else {
          console.log('comment를 받아오는 데 실패');
        }
      })
      .catch(err => console.log(err));
  };

  const onEditSubmit = event => {
    event.preventDefault();

    const variables = {
      commentId: '6090e2e6fd47759d7f351ec1',
      description: commentValue,
    };

    const url =
      'http://localhost:4000/contents/editcomment/608e665af74f883c54bc72e2';

    const config = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDhlNjU3ZmY3NGY4ODNjNTRiYzcyZTEiLCJpYXQiOjE2MTk5NDQ5MTEsImV4cCI6MTYxOTk1NTcxMX0.EXPkFMz1iyY2xp86d_EGKRLWrgSKpLFLv49k3TMjtFY',
      },
    };

    axios
      .patch(url, variables, config)
      .then(response => {
        if (response) {
          console.log(response);
        } else {
          console.log('comment를 받아오는 데 실패');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          borderTop: '1px solid #badfdb',
          padding: '8px',
        }}
      >
        <img alt="프사" style={{ margin: '10px' }} />
        <div>
          <div style={{ display: 'flex' }}>
            <Writer>{commentUser}</Writer>
            <Button onClick={handleEditComment}>수정</Button>
            <Button>삭제</Button>
          </div>
          <div>
            <Content>{comment}</Content>
          </div>
        </div>
      </div>

      {editComment && (
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <textarea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={handleChange}
            placeholder={commentValue}
          />
          <br />
          <button
            type="button"
            style={{ width: '20%', height: '52px' }}
            onClick={onEditSubmit}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

SingleComment.propTypes = {
  comment: propTypes.string.isRequired,
  commentUser: propTypes.string.isRequired,
};

export default SingleComment;
