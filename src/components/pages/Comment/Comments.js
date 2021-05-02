import React, { useState } from 'react';
import axios from 'axios';

function Comments() {
  const [comment, setComment] = useState('');

  const handleChange = event => {
    setComment(event.currentTarget.value);
    console.log(comment);
  };

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

  return (
    <div style={{ margin: '50px 20px' }}>
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
