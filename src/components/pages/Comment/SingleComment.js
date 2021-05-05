import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import propTypes from 'prop-types';
import Textarea from '../../../utils/Textarea';

const Writer = styled('div')`
  padding: 5px;
  color: grey;
  width: 40%;
`;

const CommentBOX = styled('div')`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #badfdb;
  padding: 8px;
  margin: 10px 200px;
`;

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
  align-items: center;
  margin: 30px 120px;
`;

const Content = styled('div')`
  padding: 5px;
`;

const TOP = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const SmallButton = styled('button')`
  height: 20px;
  width: 70px;
  background-color: #ffc5a1;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 700;
  border: none;
  &:hover {
    background-color: #f8a978;
  }
`;

const ButtonContainer = styled('div')`
  height: 20px;
  width: 180px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

function SingleComment(props) {
  const [commentValue, setCommentValue] = useState('');
  const [editComment, setEditComment] = useState(false);
  const [realCommentId, setRealCommentId] = useState('');
  const { comment, commentUser, commentId } = props;
  const { contentId } = useParams();

  const handleChange = event => {
    setCommentValue(event.currentTarget.value);
  };

  const handleEditComment = event => {
    console.log('comment id 는 ', event.currentTarget.className.split(' ')[2]);
    setRealCommentId(event.currentTarget.className.split(' ')[2]);

    setEditComment(!editComment);
  };

  const onSubmit = event => {
    event.preventDefault();

    const variables = {
      description: commentValue,
    };

    const url = `http://localhost:4000/contents/addcomment/${contentId}`;

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
      commentId: realCommentId,
      description: commentValue,
    };

    const url = `http://localhost:4000/contents/editcomment/${contentId}`;

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
      <CommentBOX>
        {/* <img alt="프사" style={{ margin: '10px' }} /> */}

        <TOP>
          <Writer>{commentUser}</Writer>
          <ButtonContainer>
            <SmallButton onClick={handleEditComment} className={commentId}>
              Edit
            </SmallButton>
            <SmallButton className={commentId}>Delete</SmallButton>
          </ButtonContainer>
        </TOP>
        <div>
          <Content>{comment}</Content>
        </div>
      </CommentBOX>

      {editComment && (
        <FORM onSubmit={onSubmit}>
          <Textarea onChange={handleChange} />
          <br />
          <SubmitButton type="button" onClick={onEditSubmit}>
            Submit
          </SubmitButton>
        </FORM>
      )}
    </div>
  );
}

SingleComment.propTypes = {
  comment: propTypes.string.isRequired,
  commentUser: propTypes.string.isRequired,
  commentId: propTypes.string.isRequired,
};

export default SingleComment;
