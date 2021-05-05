import React, { useState } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import useCheckToken from '../../../../utils/Hook/useCheckToken';

const INPUT = styled.input`
  width: 100%;
  height: 100%;
  padding: 50px;
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
    <form onSubmit={event => event.preventDefault}>
      <INPUT
        onChange={handleDetailChange('title')}
        type="text"
        value={change.title}
      />

      <INPUT
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
