import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

axios.defaults.withCredentials = true;

function DetailContents() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [like, setLike] = useState('');
  const [comment, setComment] = useState([]);

  console.log(title);
  console.log(category);
  console.log(description);
  console.log(like);
  console.log(comment);

  const { contentId } = useParams();
  const url = `http://localhost:3000/contents/detail/${contentId}`;
  axios
    .get(url)
    .then(response => {
      const set = response.contentInfo;
      setTitle(set.title);
      setCategory(set.category);
      setDescription(set.description);
      setLike(set.like);
      setComment().concat(set.comment);
    })
    .catch(err => {
      console.log(err);
    });

  return <div>Hi</div>;
}

export default DetailContents;
