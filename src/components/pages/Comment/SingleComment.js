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
    setRealCommentId(event.currentTarget.className.split(' ')[2]);
    setEditComment(!editComment);
  };

  // ?????? ?????? ??????
  const onEditSubmit = event => {
    event.preventDefault();
    setResult();
    if (result && nickname === commentUserName && result.isAuth) {
      const variables = {
        commentId: realCommentId,
        description: commentValue,
      };
      const url = `${process.env.REACT_APP_SERVER_URL}/contents/editcomment/${contentId}`;

      const config = {
        headers: {
          Authorization: `Bearer ${result.accessToken}`,
        },
      };

      axios
        .patch(url, variables, config)
        .then(response => {
          if (response) {
            setReRender([]);
          } else {
            dispatch({ type: 'ERROR_MODAL_TRUE' });
            dispatch({
              type: 'SET_ERROR_MESSAGE',
              payload: '?????? ?????? ??????',
            });
          }
        })
        .catch(() => {
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '?????? ????????? ??????????????????.',
          });
        });
    } else if (!result) {
      dispatch({ type: 'ERROR_MODAL_TRUE' });
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: '???????????? ????????? ??????????????????.',
      });
    } else {
      dispatch({ type: 'ERROR_MODAL_TRUE' });
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: '????????? ????????????.',
      });
    }
  };

  // ?????? ?????? ??????
  const handleDeleteButton = event => {
    setDeleteCommentId(event.currentTarget.className.split(' ')[2]);
  };

  const onDeleteComment = () => {
    if (deleteCommentId) {
      setResult();
      if (result && nickname === commentUserName && result.isAuth) {
        const variables = {
          commentId: deleteCommentId,
        };

        const url = `${process.env.REACT_APP_SERVER_URL}/contents/deletecomment/${contentId}`;

        const config = {
          headers: {
            authorization: `Bearer ${result.accessToken}`,
          },
        };

        axios
          .patch(url, variables, config)
          .then(response => {
            if (response) {
              setReRender([]);
            } else {
              dispatch({ type: 'ERROR_MODAL_TRUE' });
              dispatch({
                type: 'SET_ERROR_MESSAGE',
                payload: '?????? ?????? ??????',
              });
            }
          })
          .catch(() => {
            dispatch({ type: 'ERROR_MODAL_TRUE' });
            dispatch({
              type: 'SET_ERROR_MESSAGE',
              payload: '?????? ????????? ??????????????????.',
            });
          });
      } else if (!result) {
        dispatch({ type: 'ERROR_MODAL_TRUE' });
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: '???????????? ????????? ??????????????????.',
        });
      } else {
        dispatch({ type: 'ERROR_MODAL_TRUE' });
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: '????????? ????????????.',
        });
      }
    }
  };

  useEffect(() => {
    onDeleteComment();
  }, [deleteCommentId]);

  return (
    <div>
      <CommentBOX>
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
