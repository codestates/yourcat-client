import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
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
  font-size: 15px;
`;

const ButtonBOX = styled.div`
  margin-left: auto;
  margin-right: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 240px;
  height: 40px;
`;

const NICKNAME = styled.div`
  font-size: 17px;
  color: grey;
`;

const LIKEBNT = styled.button`
  width: 120px;
  height: 45px;
  background-color: #badfdb;
  color: white;
  border-radius: 20px;
  font-size: 17px;
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
  font-weight: 400;
  font-size: 20px;
  line-height: 180%;
`;

const Button = styled.button`
  width: 84px;
  height: 35px;
  background-color: #ffc5a1;
  color: white;
  border-radius: 7px;
  font-size: 17px;
  border: none;
  &:hover {
    background-color: #f8a978;
  }
`;

function DetailContents() {
  const [{ title, description, like, user }, setContentData] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [likeSwitch, setLikeSwitch] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const myInfo = useSelector(data => data.getUserInfo);
  const { contentId } = useParams();
  const [{ result }, setResult] = useCheckToken();

  const onBookmarkHandler = () => {
    const variables = {
      isBookmark: false,
    };

    if (likeSwitch) {
      variables.isBookmark = false;
    } else {
      variables.isBookmark = true;
    }

    if (result.isAuth) {
      const url = `${process.env.REACT_APP_SERVER_URL}/bookmarks/edit/${contentId}`;

      const config = {
        headers: {
          authorization: `Bearer ${result.accessToken}`,
        },
      };

      axios
        .patch(url, variables, config)
        .then(() => {
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '북마크 실패',
          });
        })
        .catch(() => '');
    }
  };

  useEffect(() => {
    if (likeSwitch) {
      setContentData({ title, description, user, like: like + 1 });
    } else {
      setContentData({ title, description, user, like: like - 1 });
    }
    onBookmarkHandler();
  }, [likeSwitch]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_SERVER_URL}/contents/detail/${contentId}`;
    axios
      .get(url)
      .then(response => {
        setContentData(response.data.contentInfo);
      })
      .catch(() => '');
  }, []);

  const commentDeleteHandler = () => {
    setResult();
    if (result.isAuth) {
      axios
        .delete(
          `${process.env.REACT_APP_SERVER_URL}/contents/delete/${contentId}`,
          {
            headers: {
              authorization: `Bearer ${result.accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(() => {
          history.push('/community');
        })
        .catch(() => {
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '권한이 없습니다.',
          });
        });
    } else {
      dispatch({ type: 'ERROR_MODAL_TRUE' });
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: '로그인이 필요합니다.',
      });
    }
  };

  const switchIsEdit = () => {
    setResult();
    if (result.isAuth) {
      if (user.userName === myInfo.nickname) {
        setIsEdit(true);
      } else {
        dispatch({ type: 'ERROR_MODAL_TRUE' });
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: '잘못된 접근입니다.',
        });
      }
    } else {
      dispatch({ type: 'ERROR_MODAL_TRUE' });
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: '로그인이 필요합니다.',
      });
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
      <HEADER>커뮤니티</HEADER>

      <CONTENT>
        <TITLE>{title}</TITLE>

        <MidBar>
          {user !== undefined ? (
            <NICKNAME>글쓴이 : {user.userName}</NICKNAME>
          ) : (
            <> </>
          )}
          <ButtonBOX>
            <Button type="button" onClick={switchIsEdit}>
              Edit
            </Button>
            <Button type="button" onClick={commentDeleteHandler}>
              Delete
            </Button>
          </ButtonBOX>
        </MidBar>
        <DESCRIPTION>{description}</DESCRIPTION>
        <LikeBOX>
          <LIKEBNT onClick={() => setLikeSwitch(!likeSwitch)}>
            👍 {like < 0 ? 0 : like} Likes
          </LIKEBNT>
        </LikeBOX>
      </CONTENT>

      <Comments />
    </>
  );
}

export default DetailContents;
