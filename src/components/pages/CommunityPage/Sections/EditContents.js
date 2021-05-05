import React, { useState } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import useCheckToken from '../../../../utils/Hook/useCheckToken';
import HEADER from '../../../../utils/Header';

const TITLE = styled.input`
  all: unset;
  display: flex;
  padding: 16px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  margin: 50px auto;
  width: 70%;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 300;
  font-size: 25px;
  &:hover {
    border: 1.5px solid #badfdb;
  }
`;

const DESCRIPTION = styled.textarea`
  all: unset;
  display: flex;
  padding: 16px;

  width: 70%;
  height: 40vh;
  margin: 20px auto;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  &:hover {
    border: 1.5px solid #badfdb;
  }

  font-weight: 300;
  font-size: 25px;
`;

function EditContents({
  title,
  description,
  like,
  user,
  setIsEdit,
  setContentData,
}) {
  console.log(user);
  const { contentId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [change, setChange] = useState({ title, description });
  const [{ result }, setResult] = useCheckToken();
  const handleDetailChange = key => event => {
    const data = {
      ...change,
      like,
      user,
      [key]: event.target.value,
    };
    setChange(data);
    setContentData(data);
  };
  const handleSubmit = () => {
    setResult();
    console.log(result);
    console.log(contentId);
    if (result.isAuth) {
      axios
        .patch(
          `http://localhost:4000/contents/edit/${contentId}`,
          { title, description },
          {
            headers: {
              authorization: `Bearer ${result.accessToken}`,
            },
          },
        )
        .then(res => {
          console.log(res);
          setIsEdit(false);
        })
        .catch(err => err);
    }
  };
  const switchIsEdit = () => {
    setIsEdit(false);
  };
  const commentDeleteHandler = () => {
    setResult();
    if (result.isAuth) {
      axios
        .delete(`http://localhost:4000/contents/delete/${contentId}`, {
          headers: {
            authorization: `Bearer ${result.accessToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          console.log(res);
          history.push('/community');
        })
        .catch(() => {
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '권한이 없습니다.',
          });
        });
    } else {
      dispatch({ type: 'ERROR_MODAL_TRUE' });
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: '로그인이 필요합니다.',
      });
    }
  };
  return (
    <>
      <HEADER>Edit post</HEADER>
      <form onSubmit={event => event.preventDefault}>
        <TITLE
          onChange={handleDetailChange('title')}
          type="text"
          value={change.title}
        />
        <DESCRIPTION
          onChange={handleDetailChange('description')}
          type="text"
          value={change.description}
        />
        <button type="button" onClick={switchIsEdit}>
          취소
        </button>
        <button type="button" onClick={handleSubmit}>
          수정
        </button>
        <button type="button" onClick={commentDeleteHandler}>
          삭제
        </button>
      </form>
    </>
  );
}
EditContents.propTypes = {
  like: propTypes.number.isRequired,

  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  setIsEdit: propTypes.func.isRequired,
  user: propTypes.shape({
    userId: propTypes.string.isRequired,
    userName: propTypes.string.isRequired,
  }),
  setContentData: propTypes.func.isRequired,
};
EditContents.defaultProps = {
  user: {},
};
export default EditContents;
