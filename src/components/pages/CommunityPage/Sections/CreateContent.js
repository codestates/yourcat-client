import React, { useState } from 'react';
import { /* useSelector */ useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import createContentData from '../../../../_actions/contents/createContents';
import useCheckToken from '../../../../utils/Hook/useCheckToken';

axios.defaults.withCredentials = true;

const TITLE = styled.input`
  display: flex;
  padding: 50px;
  border: none;
  margin: 50px auto;
  width: 70%;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 300;
  font-size: 20px;
`;

const SELECT = styled.select`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-left: auto;
  margin-right: 370px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 200;
  font-size: 17px;
`;

const DESCRIPTION = styled.input`
  display: flex;
  padding: 16px;
  border: none;
  width: 70%;
  margin: 50px auto;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 300;
  font-size: 25px;
`;

const BUTTON = styled.button`
  display: flex;
  padding: 10px;
  margin-left: auto;
  margin-right: 370px;
  border: 1px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  background-color: #f5f5f5;
`;

const CreateContent = () => {
  // 유저정보 받아오는거 다시 한번 확인하기
  // const userInfo = useSelector(loginInfo);
  // console.log(userInfo);
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
    console.log('handleCreate 안의 result.accessToken', result.accessToken);
    if (result.accessToken) {
      const { title, description } = createContent.isFinish;

      if (!title || !description) {
        console.log('모두 작성해주세요');
      } else {
        const resData = dispatch(
          createContentData({ title, category, description }),
        );
        console.log('새로 게시글을 작성할 때  ', resData);
        console.log('payload는?', resData.payload);

        const url = 'http://localhost:4000/contents/create';
        const config = {
          headers: {
            authorization: `Bearer ${result.accessToken}`,
          },
        };
        axios
          .post(url, resData.payload, config)
          .then(() => {
            console.log('성공?');
            history.push('/community');
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  return (
    <>
      <TITLE
        type="text"
        placeholder=" Title"
        onChange={handleChange('title')}
        value={createContent.title || ''}
      />
      <SELECT onChange={event => setCategory(event.target.value)}>
        <option value="general">General</option>
        <option value="question">Question</option>
        <option value="knowhow">Knowhow</option>
      </SELECT>
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
                alert('모두 작성해주세요');
              }
        }
      >
        Create
      </BUTTON>
    </>
  );
};

export default CreateContent;
