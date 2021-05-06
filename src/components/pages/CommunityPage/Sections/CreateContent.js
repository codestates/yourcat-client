import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import createContentData from '../../../../_actions/contents/createContents';
import useCheckToken from '../../../../utils/Hook/useCheckToken';
import HEADER from '../../../../utils/Header';

axios.defaults.withCredentials = true;

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
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 300;
  font-size: 25px;
  &:hover {
    border: 1.5px solid #badfdb;
  }
`;

const SELECT = styled.select`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-left: auto;
  margin-right: 250px;
  border: 1px solid;  
  border: 1.5px solid rgba(0, 0, 0, 0.15);
  border-radius: 7px;
  font-weight: 200;
  font-size: 17px;
  background-color: white;
  &:hover {
    border: 1.5px solid #badfdb;
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
  margin-left: auto;
  margin-right: 250px;
  background-color: #badfdb;
  color: white;
  border-radius: 7px;
  width: 96px;
  height: 40px;
  font-size: 17px;
  border: none;
  &:hover {
    background-color: #94d4cd;
  }
`;

const CreateContent = () => {
  const [{ result }, setResult] = useCheckToken();
  const [createContent, setCreateContent] = useState({
    title: '',
    category: '',
    description: '',
    isFinish: { title: false, category: 'general', description: false },
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const [category, setCategory] = useState('general');

  const handleChange = key => event => {
    setCreateContent({
      ...createContent,
      [key]: event.target.value,
      isFinish: { ...createContent.isFinish, [key]: event.target.value },
    });
  };

  const handleCreate = () => {
    setResult();
    if (result.accessToken) {
      const { title, description } = createContent.isFinish;

      if (!title || !description) {
        dispatch({ type: 'ERROR_MODAL_TRUE' });
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: '모두 작성해주세요',
        });
      } else {
        const resData = dispatch(
          createContentData({ title, category, description }),
        );

        const url = 'http://localhost:4000/contents/create';
        const config = {
          headers: {
            authorization: `Bearer ${result.accessToken}`,
          },
        };
        axios
          .post(url, resData.payload, config)
          .then(() => {
            history.push('/community');
          })
          .catch(() => {
            dispatch({ type: 'ERROR_MODAL_TRUE' });
            dispatch({
              type: 'SET_ERROR_MESSAGE',
              payload: '서버에 요청에 실패했습니다.',
            });
          });
      }
    }
  };

  return (
    <>
      <HEADER>Create post</HEADER>
      <CONTENT>
        <SELECT onChange={event => setCategory(event.target.value)}>
          <option value="general">General</option>
          <option value="question">Question</option>
          <option value="knowhow">Knowhow</option>
        </SELECT>
        <TITLE
          type="text"
          placeholder=" Title"
          onChange={handleChange('title')}
          value={createContent.title || ''}
        />

        <DESCRIPTION
          placeholder=" Description"
          onChange={handleChange('description')}
          value={createContent.description || ''}
        />
        <BUTTON
          type="button"
          onClick={
            createContent.title && createContent.description
              ? () => {
                  handleCreate();
                }
              : () => {
                  dispatch({ type: 'ERROR_MODAL_TRUE' });
                  dispatch({
                    type: 'SET_ERROR_MESSAGE',
                    payload: '모두 작성해주세요',
                  });
                }
          }
        >
          Create
        </BUTTON>
      </CONTENT>
    </>
  );
};

export default CreateContent;
