import React, { useState } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import useCheckToken from '../../../../utils/Hook/useCheckToken';
import HEADER from '../../../../utils/Header';

const CONTENT = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 30px;
`;

const TITLE = styled.input`
  all: unset;
  display: flex;
  padding: 16px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  margin: 50px auto;
  width: 70%;
  background: rgba(0, 0, 0, 0.003);

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

const BUTTON = styled.button`
  padding: 10px;
  width: 96px;
  height: 40px;
  background-color: #badfdb;
  color: white;
  border-radius: 7px;
  font-size: 17px;
  border: none;
  &:hover {
    background-color: #94d4cd;
  }
`;

const ButtonBOX = styled.div`
  margin-left: auto;
  margin-right: 180px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 240px;
  height: 40px;
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
  const [change, setChange] = useState({ title, description });
  const [{ result }, setResult] = useCheckToken();
  const dispatch = useDispatch();
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
        .then(() => {
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '글 작성에 성공했습니다.',
          });
          setIsEdit(false);
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
  const switchIsEdit = () => {
    setIsEdit(false);
  };

  return (
    <>
      <HEADER>Edit post</HEADER>
      <CONTENT onSubmit={event => event.preventDefault}>
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
        <ButtonBOX>
          <BUTTON type="button" onClick={switchIsEdit}>
            Back
          </BUTTON>
          <BUTTON type="button" onClick={handleSubmit}>
            Create
          </BUTTON>
        </ButtonBOX>
      </CONTENT>
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
