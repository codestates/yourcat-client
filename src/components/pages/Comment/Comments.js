import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Writer = styled('h6')`
  padding: 5px;
  color: grey;
`;

const Content = styled('h4')`
  padding: 5px;
`;

const Button = styled('button')`
  margin: 0 10px;
`;

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
        console.log('comment는 ', response.data.contentInfo.comment);
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
      <div style={{ fontSize: '20px', color: 'green' }}>Comments</div>
      <br />
      <br />
      {commentList &&
        commentList.map(ele => (
          <div style={{ display: 'flex' }}>
            <img alt="프사" style={{ margin: '10px' }} />
            <div>
              <div style={{ display: 'flex' }}>
                <Writer>코이언니</Writer>
                <Button>수정</Button>
                <Button>삭제</Button>
              </div>
              <div>
                <Content>{ele.description}</Content>
              </div>
            </div>
          </div>
        ))}

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
