import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
// import useCheckToken from '../../../utils/Hook/useCheckToken';
import getUserInfo from '../../../_actions/users/getUserInfo';

const CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  margin: 200px;
`;

const CATINFO = styled.div`
  display: flex;
  flex-direction: column;
`;

const CATNAME = styled.div`
  display: flex;
  flex-direction: column;
`;

const CATAGE = styled.div`
  display: flex;
  flex-direction: column;
`;

const CATGENDER = styled.div`
  display: flex;
  flex-direction: column;
`;

const IMAGE = styled.img`
  display: flex;
  flex-direction: column;
`;

const BTNCONTAINER = styled.div`
  display: flex;
  flex-direction: column;
`;

const MYPAGEBTN = styled.button`
  display: flex;
  flex-direction: column;
`;

const BOOKMARKBTN = styled.button`
  display: flex;
  flex-direction: column;
`;

const LOGOUTBTN = styled.button`
  display: flex;
  flex-direction: column;
`;

const CLOSEBTN = styled.button`
  display: flex;
  flex-direction: column;
`;

function SideBar() {
  // 아직 경로 지정 안함
  // Nav 에서 로그인이 되었을 때 버튼이 생겨야하고
  // 그 버튼을 클릭했을 때 getUserInfo를 해서 값이 들어와야한다

  const result = useSelector(data => {
    return data.catInfo;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo(result));
  }, [result]);

  const [{ name, age, gender, image }, setCat] = useState();

  if (!result.name) {
    setCat({
      name: 'Your Cat',
      age: '12',
      gender: 'Male',
      image: 'result.image',
    });
  } else {
    setCat(result);
  }

  // 일단은 값 확인
  // const url = 'http://localhost:4000/users/userinfo';
  // const config = {
  //   headers: {
  //     authorization: `Bearer ${accessToken}`,
  //   },
  // };
  // axios
  //   .get(url, config)
  //   .then(response => {
  //     console.log(response.data);
  //     const info = response.data.catInfo;
  //     if(!info.name) {
  //       setCat({
  //         name: 'Your Cat',
  //     age: '12',
  //     gender: 'Male',
  //     image: 'result.image',
  //       })
  //     } else {
  //       setCat(info)
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  return (
    <CONTAINER>
      <CATINFO>
        <IMAGE src={image} alt="" />
        <CATNAME>Cat Name: {name}</CATNAME>
        <CATAGE>Cat Age: {age} Month</CATAGE>
        <CATGENDER>Cat Gender: {gender}</CATGENDER>
      </CATINFO>
      <BTNCONTAINER>
        <MYPAGEBTN>My Page</MYPAGEBTN>
        <BOOKMARKBTN>BookMark</BOOKMARKBTN>
        <LOGOUTBTN>Logout</LOGOUTBTN>
        <CLOSEBTN>CLOSE</CLOSEBTN>
      </BTNCONTAINER>
    </CONTAINER>
  );
}

export default SideBar;

// 사이드바에 필요한 기능
// 1. Navbar에 버튼을 누르면(토큰 O)
// 1-1. 고양이 정보 불러오기(axios)
// 1-2. 마이페이지 버튼 => onClick
// 1-3. 북마크 버튼 => onClick
// 1-4. 로그아웃 버튼 => onClick
// 1-5. close 버튼 => onClick
