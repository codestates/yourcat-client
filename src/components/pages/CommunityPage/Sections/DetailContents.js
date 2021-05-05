import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import useCheckToken from '../../../../utils/Hook/useCheckToken';
import EditContents from './EditContents';
import Comments from '../../Comment/Comments';
import HEADER from '../../../../utils/Header';

axios.defaults.withCredentials = true;

const TITLE = styled.div`
  display: flex;
  padding: 20px;

  margin-top: 50px;
  width: 70%;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 400;
  font-size: 25px;
`;

const CONTENT = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 30px;
`;

const MidBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  padding: 10px 0;
  padding-left: 30px;
  background: rgba(0, 0, 0, 0.003);
  font-size: 15px;
`;

const MidRight = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 30%;
`;

const NICKNAME = styled.div`
  font-size: 17px;
  color: grey;
`;

const LIKEBNT = styled.button`
  border-radius: 10px;
  font-size: 17px;
  background-color: #badfdb;
  color: white;
  border: none;
  &:hover {
    background-color: #94d4cd;
  }
`;

const LikeBOX = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const DESCRIPTION = styled.div`
  display: flex;
  padding: 50px;
  border: none;
  width: 70%;
  margin: 50px auto;
  margin-bottom: 80px;
  background: rgba(0, 0, 0, 0.003);
  font-weight: 400;
  font-size: 20px;
`;

const Button = styled('button')`
  width: 100px;
  height: 30px;
  background-color: #ffc5a1;
  color: white;
  border-radius: 10px;
  font-size: 17px;
  margin: 0 10px;

  border: none;
  &:hover {
    background-color: #f8a978;
  }
`;

function DetailContents() {
  const [{ title, description, like, user }, setContentData] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [likeSwitch, setLikeSwitch] = useState(false);

  const myInfo = useSelector(data => data.getUserInfo);
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
        console.log(response.data.contentInfo);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const switchIsEdit = () => {
    setResult();
    console.log(result);
    if (result.isAuth) {
      console.log(user);
      if (user.userName === myInfo.nickname) {
        setIsEdit(true);
      } else {
        alert('잘못된 접근입니다.');
      }
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
      <HEADER>Community</HEADER>

      <CONTENT>
        <TITLE>{title}</TITLE>

        <MidBar>
          {user !== undefined ? (
            <NICKNAME>Writer : {user.userName}</NICKNAME>
          ) : (
            <> </>
          )}
          <MidRight>
            <Button type="button" onClick={switchIsEdit}>
              Edit
            </Button>
            <LikeBOX>
              <LIKEBNT onClick={() => setLikeSwitch(!likeSwitch)}>
                👍 {like} Likes
              </LIKEBNT>
            </LikeBOX>
          </MidRight>
        </MidBar>
        <DESCRIPTION>{description}</DESCRIPTION>
      </CONTENT>

      <Comments />
    </>
  );
}

export default DetailContents;
