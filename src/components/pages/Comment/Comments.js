import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useCheckToken from '../../../utils/Hook/useCheckToken';
import SingleComment from './SingleComment';
import Textarea from '../../../utils/Textarea';
import ErrModal from '../../../utils/ErrModal/ErrModal';

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
  margin: 50px 120px;
`;

function Comments() {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [reRender, setReRender] = useState([]);
  const [{ result }, setResult] = useCheckToken();
  const [modalMessage, setModalMessage] = useState('');
  const dispatch = useDispatch();
  const { contentId } = useParams();

  const handleChange = event => {
    setComment(event.currentTarget.value);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/contents/detail/${contentId}`)
      .then(response => {
        setCommentList(response.data.contentInfo.comment);
      });
  }, [reRender]);

  const onSubmit = event => {
    event.preventDefault();
    setResult();
    if (result.isAuth) {
      const variables = {
        description: comment,
      };

      const url = `${process.env.REACT_APP_SERVER_URL}/contents/addcomment/${contentId}`;

      const config = {
        headers: {
          authorization: `Bearer ${result.accessToken}`,
        },
      };

      if (variables.description.length !== 0) {
        axios
          .patch(url, variables, config)
          .then(response => {
            if (response) {
              setReRender([]);
              setComment('');
            } else {
              dispatch({ type: 'ERROR_MODAL_TRUE' });
              dispatch({
                type: 'SET_ERROR_MESSAGE',
                payload: '?????? ????????? ??????????????????.',
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
      } else {
        setModalMessage('????????? ??????????????????.');
        dispatch({ type: 'ERROR_MODAL_TRUE' });
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: '????????? ??????????????????.',
        });
      }
    } else {
      dispatch({ type: 'ERROR_MODAL_TRUE' });
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: '???????????? ???????????????.',
      });
    }
  };

  return (
    <div style={{ margin: '50px 50px' }}>
      <div style={{ fontSize: '20px', color: '#badfdb', margin: '0 220px' }}>
        ??????
      </div>
      <br />
      <br />
      <div>
        {commentList &&
          commentList.map(ele => (
            <SingleComment
              key={ele.commentId}
              comment={ele.description}
              commentUser={ele.commentUserName}
              commentId={ele.commentId}
              setReRender={setReRender}
              commentUserName={ele.commentUserName}
            />
          ))}
      </div>

      <FORM onSubmit={onSubmit}>
        <Textarea onChange={handleChange} value={comment} />

        <SubmitButton type="button" onClick={onSubmit}>
          Submit
        </SubmitButton>
        <ErrModal message={modalMessage} />
      </FORM>
    </div>
  );
}

export default Comments;
