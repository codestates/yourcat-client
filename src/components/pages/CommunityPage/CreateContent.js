import React, { useState } from 'react';
import { /* useSelector */ useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import createContentData from '../../../_actions/createContents';
// import loginInfo from '../LoginPage/LoginModal';

axios.defaults.withCredentials = true;

const CreateContent = () => {
  // 유저정보 받아오는거 다시 한번 확인하기
  //   const userInfo = useSelector(loginInfo);
  //   console.log(userInfo);
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
    const { title, description } = createContent.isFinish;
    if (!title || !description) {
      console.log('모두 작성해주세요');
    } else {
      const result = dispatch(
        createContentData({ title, category, description }),
      );
      console.log('새로 게시글을 작성할 때  ', result);
      const url = 'http://localhost:3000/contents/create';
      axios({
        method: 'post',
        url,
        header: {
          'Content-Type': 'application/json',
        },
        result,
      })
        .then(() => {
          history.push('/contents');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder=" Title"
        onChange={handleChange('title')}
        value={createContent.title || ''}
      />
      <select onChange={event => setCategory(event.target.value)}>
        <option value="general">General</option>
        <option value="question">Question</option>
        <option value="knowhow">Knowhow</option>
        <option value="photo">Photo</option>
      </select>
      <textarea
        placeholder=" Description"
        onChange={handleChange('description')}
        value={createContent.description || ''}
      />
      <button
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
      </button>
    </div>
  );
};

export default CreateContent;
