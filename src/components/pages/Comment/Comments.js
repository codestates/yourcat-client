import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SingleComment from './SingleComment';
import Textarea from '../../../utils/Textarea';

const SubmitButton = styled('button')`
  height: 52px;
  width: 10%;
  background-color: #badfdb;
  color: white;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 700;
  border: none;
  &:hover {
    background-color: #94d4cd;
  }
`;

const FORM = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center; ;
`;

function Comments() {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  const handleChange = event => {
    setComment(event.currentTarget.value);
    console.log(comment, typeof comment);
  };

  useEffect(() => {
    axios
      .get('http://localhost:4000/contents/detail/608e665af74f883c54bc72e2')
      .then(response => {
        console.log('responseData는 ', response.data);
        console.log('comment ', response.data.contentInfo.comment);
        setCommentList(response.data.contentInfo.comment);
      });
  }, []);

  const onSubmit = event => {
    event.preventDefault();

    const variables = {
      description: comment,
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

  // TODO: 본인이 쓴 댓글이면 수정, 삭제 버튼 나타나도록
  return (
    <div style={{ margin: '50px 20px' }}>
      <div style={{ fontSize: '20px', color: '#f8a978' }}>Comments</div>
      <br />
      <br />
      <div>
        {commentList &&
          commentList.map(ele => (
            <SingleComment
              key={ele.commentId}
              comment={ele.description}
              commentUser={ele.commentUserName}
            />
          ))}
      </div>

      <br />
      <br />
      <FORM onSubmit={onSubmit}>
        <Textarea onChange={handleChange} value={comment} />

        <SubmitButton type="button" onClick={onSubmit}>
          Submit
        </SubmitButton>
      </FORM>
    </div>
  );
}

export default Comments;
