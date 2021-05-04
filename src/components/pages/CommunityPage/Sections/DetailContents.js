import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
// import { useSelector } from 'react-redux';
import useCheckToken from '../../../../utils/Hook/useCheckToken';
import EditContents from './EditContents';
import Comments from '../../Comment/Comments';

axios.defaults.withCredentials = true;

const TITLE = styled.div`
  display: flex;
  padding: 50px;
  border: none;
  margin: 50px auto;
  width: 70%;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 300;
  font-size: 40px;
`;

const DIV = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  padding: 5px;
  background: rgba(0, 0, 0, 0.003);
  font-size: 15px;
`;

const NICKNAME = styled.div`
  flex: none;
  border: none;
  margin: 17px 0 0 300px;
  margin-rigth: auto;
  background: rgba(0, 0, 0, 0.003);
  font-size: 17px;
`;

const LIKEBNT = styled.button`
  margin: 7px;
  margin-left: auto;
  border: 1px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  font-size: 17px;
  background-color: #f5f5f5;
`;

const LIKE = styled.div`
  border: none;
  margin: 15px;
  background: rgba(0, 0, 0, 0.003);
  font-size: 17px;
`;

const DESCRIPTION = styled.div`
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

function DetailContents() {
  const [{ title, description, like, user }, setContentData] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [likeSwitch, setLikeSwitch] = useState(false);

  const { contentId } = useParams();
  const [{ result }, setResult] = useCheckToken();

  const onBookmarkHandler = () => {
    const variables = {
      isBookmark: false,
    };

    if (likeSwitch) {
      console.log('북마크에 추가');
      variables.isBookmark = false;
    } else {
      console.log('북마크에서 삭제');
      variables.isBookmark = true;
    }

    const url = `http://localhost:4000/bookmarks/edit/${contentId}`;

    const config = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDhlNjU3ZmY3NGY4ODNjNTRiYzcyZTEiLCJpYXQiOjE2MTk5NDQ5MTEsImV4cCI6MTYxOTk1NTcxMX0.EXPkFMz1iyY2xp86d_EGKRLWrgSKpLFLv49k3TMjtFY',
      },
    };

    axios
      .patch(url, variables, config)
      .then(response => {
        if (response) {
          console.log('북마크 성공');
        } else {
          console.log('북마크 실패');
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    console.log('likeSwitch', likeSwitch);
    if (likeSwitch) {
      setContentData({ title, description, user, like: like + 1 });
    } else {
      setContentData({ title, description, user, like: like - 1 });
    }
    onBookmarkHandler();
  }, [likeSwitch]);

  useEffect(() => {
    const url = `http://localhost:4000/contents/detail/${contentId}`;
    axios
      .get(url)
      .then(response => {
        console.log('res.data ', response.data);
        setContentData(response.data.contentInfo);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const switchIsEdit = () => {
    setResult();
    if (result) {
      setIsEdit(true);
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  return isEdit ? (
    <EditContents
      title={title}
      description={description}
      user={user}
      setIsEdit={setIsEdit}
      setContentData={setContentData}
    />
  ) : (
    <>
      <TITLE>{title}</TITLE>
      <button type="button" onClick={switchIsEdit}>
        수정
      </button>
      <DIV>
        {user !== undefined ? (
          <NICKNAME>😸Nickname: {user.userName}</NICKNAME>
        ) : (
          <> </>
        )}
        <LIKEBNT onClick={() => setLikeSwitch(!likeSwitch)}>Like👍 </LIKEBNT>
        <LIKE>{like}</LIKE>
      </DIV>
      <DESCRIPTION>{description}</DESCRIPTION>
      <Comments />
    </>
  );
}

export default DetailContents;
