import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleComment from './SingleComment';

function Comments() {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  const handleChange = event => {
    setComment(event.currentTarget.value);
    console.log(comment);
  };

  useEffect(() => {
    axios
      .get('http://localhost:4000/contents/detail/608e665af74f883c54bc72e2')
      .then(response => {
        console.log('responseData는 ', response.data);
        console.log('comment ', response.data.contentInfo.comment);
        setCommentList(response.data.contentInfo.comment);
      });
  }, []);

  const onSubmit = event => {
    event.preventDefault();

    const variables = {
      description: comment,
    };

    const url =
      'http://localhost:4000/contents/addcomment/608e665af74f883c54bc72e2';

    axios({
      method: 'patch',
      url,
      header: {
        'Content-Type': 'application/json',
      },
      variables,
    }).then(response => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        console.log('comment를 받아오는 데 실패');
      }
    });
  };

  // TODO: 본인이 쓴 댓글이면 수정, 삭제 버튼 나타나도록
  return (
    <div style={{ margin: '50px 20px' }}>
      <div style={{ fontSize: '20px', color: '#f8a978' }}>Comments</div>
      <br />
      <br />
      <div>
        {commentList &&
          commentList.map(ele => <SingleComment comment={ele.description} />)}
      </div>

      <br />
      <br />
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={comment}
          placeholder="write some comments"
        />
        <br />
        <button
          type="button"
          style={{ width: '20%', height: '52px' }}
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comments;
