import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import EditInfo from './Sections/EditInfo';
import useCheckToken from '../../../utils/Hook/useCheckToken';
import HEADER from '../../../utils/Header';

const IMAGE = styled.img`
  display: flex;
  width: 270px;
  height: 270px;
  border-radius: 20px;
`;
const TEXT = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 270px;
  justify-content: center;
`;
const NAME = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0px 55px 0px;
  font-size: 25px;
`;
const GENDER = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 55px 0px;
  font-size: 25px;
`;
const AGE = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
`;

const NICKNAME = styled.div`
  font-size: 25px;
`;
const EMAIL = styled.div`
  font-size: 25px;
`;
const CONTENT = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CatinfoBOX = styled('form')`
  width: 80%;
  margin: 10px 0;
  background-color: #fcf9ea;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserinfoBOX = styled('form')`
  width: 80%;
  margin: 10px 0;
  background-color: #fcf9ea;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteDIV = styled('div')`
  background-color: white;
  border-radius: 10px;
  padding: 0 30px;
  width: 95%;
  margin: 20px 0;
  height: 40vh;
`;

const UserWhiteDIV = styled('div')`
  background-color: white;
  border-radius: 10px;
  padding: 0 30px;
  width: 95%;
  margin: 20px 0;
  height: 20vh;
`;
const InnerDIV = styled('div')`
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding-left: 70px;
`;

const CatInnerDIV = styled('div')`
  width: 100%;
  height: 40vh;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

const BUTTON = styled.button`
  padding: 10px;
  width: 96px;
  height: 40px;
  background-color: #badfdb;
  color: white;
  border-radius: 7px;
  font-size: 17px;
  border: none;
  &:hover {
    background-color: #94d4cd;
  }
`;

const WDBUTTON = styled.button`
  padding: 10px;
  width: 96px;
  height: 40px;
  background-color: #ffc5a1;
  color: white;
  border-radius: 7px;
  font-size: 17px;
  border: none;
  &:hover {
    background-color: #f8a978;
  }
`;

const ButtonBOX = styled.div`
  margin-left: auto;
  margin-right: 180px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 240px;
  height: 40px;
`;

function MyPage() {
  const resData = useSelector(state => {
    return state.getUserInfo;
  });
  const [{ catInfo, nickname, email }, setInfo] = useState(resData);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [{ result }, setResult] = useCheckToken();

  useEffect(() => {
    if (!resData.catInfo.name) {
      setInfo({
        ...resData,
        catInfo: {
          name: 'Your Cat',
          age: 12,
          gender: 'Male',
          image:
            'https://testyourcat.s3.ap-northeast-2.amazonaws.com/images/1620144235807.png ',
        },
      });
    } else {
      setInfo(resData);
    }
  }, [resData]);
  const switchIsEdit = () => {
    setIsEdit(true);
  };
  const deleteSubmit = () => {
    setResult();
    if (result.isAuth) {
      const url = `${process.env.REACT_APP_SERVER_URL}/users/withdrawal`;
      const config = {
        headers: {
          authorization: `Bearer ${result.accessToken}`,
        },
      };
      axios
        .delete(url, config)
        .then(() => {
          history.push('/');
          dispatch({ type: 'DELETE_TOKEN' });
          dispatch({ type: 'DELETE_USERINFO' });
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '????????? ?????????????????????.',
          });
        })
        .catch(() => {
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '?????? ????????? ??????????????????.',
          });
        });
    }
  };
  return (
    <>
      {isEdit ? (
        <EditInfo
          catInfo={catInfo}
          nickname={nickname}
          setIsEdit={setIsEdit}
          setInfo={setInfo}
          email={email}
        />
      ) : null}
      <HEADER>?????? ?????????</HEADER>
      <CONTENT>
        <CatinfoBOX>
          <WhiteDIV>
            <CatInnerDIV>
              <IMAGE src={catInfo && catInfo.image} alt="" />
              <TEXT>
                <NAME>Cat Name : {catInfo && catInfo.name}</NAME>
                <GENDER>Cat Gender : {catInfo && catInfo.gender}</GENDER>
                <AGE>Cat Age : {catInfo && catInfo.age} Months</AGE>
              </TEXT>
            </CatInnerDIV>
          </WhiteDIV>
        </CatinfoBOX>
        <UserinfoBOX>
          <UserWhiteDIV>
            <InnerDIV>
              <NICKNAME>Nickname: {nickname}</NICKNAME>
              <EMAIL>E-Mail : {email}</EMAIL>
            </InnerDIV>
          </UserWhiteDIV>
        </UserinfoBOX>
        <ButtonBOX>
          <BUTTON onClick={switchIsEdit}> ?????? ?????? </BUTTON>
          <WDBUTTON onClick={deleteSubmit}> ?????? ?????? </WDBUTTON>
        </ButtonBOX>
      </CONTENT>
    </>
  );
}
export default MyPage;
