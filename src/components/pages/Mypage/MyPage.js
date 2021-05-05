import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import EditInfo from './Sections/EditInfo';
import useCheckToken from '../../../utils/Hook/useCheckToken';

const CATBTN = styled.button`
  display: flex;
  padding: 10px;
  margin-top: 110px;
  margin-left: auto;
  margin-right: 300px;
  margin-buttom: 10px;
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

// const BTN = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const USERBTN = styled.button`
//   display: flex;
//   padding: 10px;
//   margin-left: auto;
//   margin-right: 10px;
//   margin-top: 20px;
//   margin-buttom: 110px;
//   border: 1px;
//   border: 1px solid #bdbdbd;
//   border-radius: 10px;
//   background-color: #f5f5f5;
// `;

// const WITHDRAWALBTN = styled.button`
//   display: flex;
//   padding: 10px;
//   margin-left: 0px;
//   margin-right: 300px;
//   margin-top: 20px;
//   margin-buttom: 110px;
//   border: 1px;
//   border: 1px solid #bdbdbd;
//   border-radius: 10px;
//   background-color: #f5f5f5;
// `;

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
  const resData = useSelector(state => state.getUserInfo);
  const [{ image, name, gender, age }, setCatInfo] = useState('');
  const [{ nickname, email }, setUserInfo] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [{ result }, setResult] = useCheckToken();

  console.log('resData는', resData);
  console.log(resData.email);

  useEffect(() => {
    if (!resData.catInfo) {
      setCatInfo({
        image: 'test.catInfo.image',
        name: 'Your Cat',
        gender: 'Male',
        age: 12,
      });
    } else {
      setCatInfo({ image, name, gender, age });
    }
    setUserInfo({ nickname: resData.nickname, email: resData.email });
  }, []);

  const switchIsEdit = () => {
    setResult();
    if (result) {
      setIsEdit(true);
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  };

  //   const switchIsUserEdit = () => {
  //     setResult();
  //     if (result) {
  //       setIsUserEdit(true);
  //     } else {
  //       alert('로그인이 필요한 서비스입니다.');
  //     }
  //   };

  //   const switchIsUserWithDrawl = () => {
  //     setResult();
  //     if (result) {
  //       setUserDelete(true);
  //     } else {
  //       alert('로그인이 필요한 서비스 입니다.');
  //     }
  //   };

  return isEdit ? (
    <EditInfo
      name={name}
      gender={gender}
      age={age}
      nickname={nickname}
      email={email}
      setIsEdit={setIsEdit}
      setCatInfo={setCatInfo}
      setUserInfo={setUserInfo}
    />
  ) : (
    <>
      <CATBTN onClick={switchIsEdit}> EDIT </CATBTN>
      <CATDIV>
        <IMAGE src={image} />
        <TEXT>
          <NAME>Cat Name : {name}</NAME>
          <GENDER>Gender : {gender}</GENDER>
          <AGE>Age : {age} Month</AGE>
        </TEXT>
      </CATDIV>
      {/* <BTN>
          <USERBTN onClick={switchIsUserEdit}> EDIT </USERBTN>
          <WITHDRAWALBTN onClick={switchIsUserWithDrawl}>
            {' '}
            WITHDRAWAL{' '}
          </WITHDRAWALBTN>
        </BTN> */}
      <USERDIV>
        <NICKNAME>Nickname: {nickname}</NICKNAME>
        <EMAIL>E-Mail : {email}</EMAIL>
      </USERDIV>
    </>
  );
}

export default MyPage;

// 마이페이지에 렌더되어야 할 정보
// 1. 고양이 정보(사진, 이름, 성별, 나이) / 수정버튼
// 2. 유저 정보(유저 닉네임, 이메일) / 수정버튼 / 탈퇴버튼

// 수정 버튼을 누르면
// 1.영호님이 만든 페이지처럼 수정 할 수 있게 이벤트 발생
// 2. 수정버튼은 완료 버튼으로 변경
// 3. 완료 버튼이 눌려지면 요청을 보내고 다시 마이페이지로 돌아가기

// 탈퇴 버튼을 누르면
// 모달창이... 하나 뜨고.... 정말 탈퇴하시겠습니까 문구 뜨기
// 확인버튼을 누를 경우 탈퇴가 정상적으로 처리 되었습니다. 문구 뜨고 /로 이동
// 취소 버튼을 누를 경우 마이페이지로 이동
