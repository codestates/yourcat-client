import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';

import Textarea from '../../../utils/Textarea';
import useCheckToken from '../../../utils/Hook/useCheckToken';

const Writer = styled('div')`
  padding: 5px;
  color: grey;
  width: 40%;
`;

const CommentBOX = styled('div')`
  display: flex;
  flex-direction: column;

  box-shadow: inset 0 2px 1px rgba(0, 0, 0, 0.05);
  padding: 8px 20px;
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
  const {
    comment,
    commentUser,
    commentId,
    setReRender,
    commentUserName,
  } = props;
  const dispatch = useDispatch();
  const [commentValue, setCommentValue] = useState(comment);
  const [editComment, setEditComment] = useState(false);
  const [realCommentId, setRealCommentId] = useState(commentId);
  const [deleteCommentId, setDeleteCommentId] = useState('');
  const [{ result }, setResult] = useCheckToken();
  const { contentId } = useParams();
  const { nickname } = useSelector(dat => dat.getUserInfo);
  const handleChange = event => {
    setCommentValue(event.currentTarget.value);
  };

  const handleEditComment = event => {
    console.log('comment id 는 ', event.currentTarget.className.split(' ')[2]);
    setRealCommentId(event.currentTarget.className.split(' ')[2]);
    setEditComment(!editComment);
  };

  // 댓글 수정 기능
  const onEditSubmit = event => {
    event.preventDefault();
    setResult();
    console.log(result);
    if (result && nickname === commentUserName && result.isAuth) {
      console.log(result.accessToken);
      const variables = {
        commentId: realCommentId,
        description: commentValue,
      };
      console.log(`realCommentId::: ${realCommentId}`);
      console.log(`contentId::: ${contentId}`);
      const url = `http://localhost:4000/contents/editcomment/${contentId}`;

      const config = {
        headers: {
          Authorization: `Bearer ${result.accessToken}`,
        },
      };

      axios
        .patch(url, variables, config)
        .then(response => {
          if (response) {
            console.log(response);
            setReRender([]);
          } else {
            dispatch({ type: 'ERROR_MODAL_TRUE' });
            dispatch({
              type: 'SET_ERROR_MESSAGE',
              payload: '댓글 수정 실패',
            });
          }
        })
        .catch(() => {
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '서버 요청에 실패했습니다.',
          });
        });
    }
  };

  // 댓글 삭제 기능
  const handleDeleteButton = event => {
    console.log(
      '삭제 comment id 는 ',
      event.currentTarget.className.split(' ')[2],
    );
    setDeleteCommentId(event.currentTarget.className.split(' ')[2]);
  };

  const onDeleteComment = () => {
    if (deleteCommentId) {
      setResult();
      console.log(result);
      if (result && nickname === commentUserName && result.isAuth) {
        console.log('deleteid', deleteCommentId);
        console.log('axios');
        const variables = {
          commentId: deleteCommentId,
        };

        const url = `http://localhost:4000/contents/deletecomment/${contentId}`;

        const config = {
          headers: {
            authorization: `Bearer ${result.accessToken}`,
          },
        };

        axios
          .patch(url, variables, config)
          .then(response => {
            if (response) {
              console.log(response);
              setReRender([]);
            } else {
              dispatch({ type: 'ERROR_MODAL_TRUE' });
              dispatch({
                type: 'SET_ERROR_MESSAGE',
                payload: '댓글 삭제 실패',
              });
            }
          })
          .catch(() => {
            dispatch({ type: 'ERROR_MODAL_TRUE' });
            dispatch({
              type: 'SET_ERROR_MESSAGE',
              payload: '서버 요청에 실패했습니다.',
            });
          });
      }
    }
  };

  useEffect(() => {
    console.log('useEffect');
    onDeleteComment();
  }, [deleteCommentId]);

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
            <SmallButton onClick={handleDeleteButton} className={commentId}>
              Delete
            </SmallButton>
          </ButtonContainer>
        </TOP>
        <div>
          <Content>{comment}</Content>
        </div>
      </CommentBOX>

      {editComment && (
        <FORM onSubmit={onEditSubmit}>
          <Textarea onChange={handleChange} value={commentValue} />
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
  setReRender: propTypes.func.isRequired,
  commentUserName: propTypes.string.isRequired,
};

export default SingleComment;
