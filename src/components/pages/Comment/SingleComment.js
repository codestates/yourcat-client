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
  const { comment } = props;

  const handleChange = event => {
    setCommentValue(event.currentTarget.value);
    console.log(commentValue);
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

    axios({
      method: 'patch',
      url,
      header: {
        'Content-Type': 'application/json',
      },
      variables,
    }).then(response => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        console.log('comment를 받아오는 데 실패');
      }
    });
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
            <Writer>코이언니</Writer>
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
            value={comment}
            placeholder={commentValue}
          />
          <br />
          <button
            type="button"
            style={{ width: '20%', height: '52px' }}
            onClick={onSubmit}
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
};

export default SingleComment;
