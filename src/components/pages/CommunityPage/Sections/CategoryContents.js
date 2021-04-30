import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router';
// import categoryData from '../../../../_actions/contents/categoryContents';

function CategoryContents() {
  const [title, setTitle] = useState('');
  const [nickName, setNickName] = useState('');

  console.log(title);
  console.log(nickName);
  console.log(setTitle);
  console.log(setNickName);

  const { category } = useParams();

  const url = `http://localhost:3000/contents/${category}`;
  axios
    .post(url)
    .then(response => console.log(response))
    .catch(err => console.log(err));

  return <div>hello Category</div>;
}

export default CategoryContents;
