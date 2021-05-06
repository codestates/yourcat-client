import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import EditInfo from './Sections/EditInfo';
import useCheckToken from '../../../utils/Hook/useCheckToken';

const BTNDIV = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 130px;
  margin-left: auto;
  margin-right: 300px;
  margin-buttom: 10px;
`;
const EDITBTN = styled.button`
  display: flex;
  padding: 10px;
  margin-left: auto;
  border: 1px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  background-color: #f5f5f5;
`;
const WITHDRAWBTN = styled.button`
  display: flex;
  padding: 10px;
  border: 1px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  background-color: #f5f5f5;
`;
const CATDIV = styled.div`
  display: flex;
  margin: 10px 50px 50px 400px;
  padding: 50px;
  width: 60%;
  border: 1px solid;
`;
const IMAGE = styled.img`
  display: flex;
  width: 200px;
  height: 200px;
`;
const TEXT = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 45px;
`;
const NAME = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0px 55px 0px;
`;
const GENDER = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 55px 0px;
`;
const AGE = styled.div`
  display: flex;
  flex-direction: column;
`;
const USERDIV = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 50px 50px 400px;
  padding: 50px;
  width: 60%;
  height: 270px;
  border: 1px solid;
`;
const NICKNAME = styled.div`
  display: flex;
  margin: 40px 0px 55px 0px;
`;
const EMAIL = styled.div`
  display: flex;
  margin: 0px 0px 55px 0px;
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
  console.log(nickname);
  console.log('resData는', resData);
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
      const url = 'http://localhost:4000/users/withdrawal';
      const config = {
        headers: {
          authorization: `Bearer ${result.accessToken}`,
        },
      };
      axios
        .delete(url, config)
        .then(response => {
          console.log('삭제?', response);
          history.push('/');
          dispatch({ type: 'DELETE_TOKEN' });
          dispatch({ type: 'DELETE_USERINFO' });
          alert('계정이 삭제되었습니다.');
        })
        .catch(err => console.log(err));
    }
  };
  return isEdit ? (
    <EditInfo
      catInfo={catInfo}
      nickname={nickname}
      setIsEdit={setIsEdit}
      setInfo={setInfo}
      email={email}
    />
  ) : (
    <>
      <BTNDIV>
        <EDITBTN onClick={switchIsEdit}> EDIT </EDITBTN>
        <WITHDRAWBTN onClick={deleteSubmit}> WITHDRAW </WITHDRAWBTN>
      </BTNDIV>
      <CATDIV>
        <IMAGE src={catInfo && catInfo.image} alt="" />
        <TEXT>
          <NAME>Cat Name : {catInfo && catInfo.name}</NAME>
          <GENDER>Gender : {catInfo && catInfo.gender}</GENDER>
          <AGE>Age : {catInfo && catInfo.age} Months</AGE>
        </TEXT>
      </CATDIV>
      <USERDIV>
        <NICKNAME>Nickname: {nickname}</NICKNAME>
        <EMAIL>E-Mail : {email}</EMAIL>
      </USERDIV>
    </>
  );
}
export default MyPage;
