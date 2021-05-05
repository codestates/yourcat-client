import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useCheckToken from '../../../utils/Hook/useCheckToken';

import SingleComment from './SingleComment';
import Textarea from '../../../utils/Textarea';

const SubmitButton = styled('button')`
  height: 52px;
  width: 10%;
  background-color: #badfdb;
  color: white;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 700;
  border: none;
  &:hover {
    background-color: #94d4cd;
  }
`;

const FORM = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 120px;
`;

function Comments() {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [reRender, setReRender] = useState([]);
  const [{ result }, setResult] = useCheckToken();

  const { contentId } = useParams();

  const handleChange = event => {
    setComment(event.currentTarget.value);
  };

  // 댓글 목록 불러와서 렌더
  useEffect(() => {
    axios
      .get(`http://localhost:4000/contents/detail/${contentId}`)
      .then(response => {
        console.log('responseData는 ', response.data);
        console.log('comment ', response.data.contentInfo.comment);
        setCommentList(response.data.contentInfo.comment);
      });
  }, [reRender]);

  // 댓글 등록 기능
  const onSubmit = event => {
    event.preventDefault();
    setResult();
    console.log('result', result);
    if (result.isAuth) {
      const variables = {
        description: comment,
      };

      const url = `http://localhost:4000/contents/addcomment/${contentId}`;

      const config = {
        headers: {
          authorization: `Bearer ${result.accessToken}`,
        },
      };

      axios
        .patch(url, variables, config)
        .then(response => {
          if (response) {
            console.log(response);
            setReRender([]);
            setComment('');
          } else {
            console.log('댓글 등록 실패');
          }
        })

        .catch(err => console.log(err));
    }
  };

  // TODO: 본인이 쓴 댓글만 수정, 삭제 가능하도록
  return (
    <div style={{ margin: '50px 50px' }}>
      <div style={{ fontSize: '20px', color: '#badfdb', margin: '0 200px' }}>
        Comments
      </div>
      <br />
      <br />
      <div>
        {commentList &&
          commentList.map(ele => (
            <SingleComment
              key={ele.commentId}
              comment={ele.description}
              commentUser={ele.commentUserName}
              commentId={ele.commentId}
              setReRender={setReRender}
              commentUserName={ele.commentUserName}
            />
          ))}
      </div>

      <FORM onSubmit={onSubmit}>
        <Textarea onChange={handleChange} value={comment} />

        <SubmitButton type="button" onClick={onSubmit}>
          Submit
        </SubmitButton>
      </FORM>
    </div>
  );
}

export default Comments;
