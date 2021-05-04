import { useState } from 'react'; // useEffect,
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { tokenHandler } from '../../_actions/users/loginUser';
// --------------------------
// import useCheckToken from 'somewhere';
//
// const [{ result }, setResult] = useCheckToken();
// setResult();
// 실행시 result = token || false
// const [x, setResult] = useCheckToken();
// const handleClick = () => {
//   setResult();
//   x.isAuth가 true이면 수정기능으로 넘어갈 수 있다.
// };
// useEffect(() => {
//   setResult();
// }, []);
// console.log(x);
// --------------------------

function checkAuth(token) {
  // 토큰 없을 때 리프레쉬토큰으로 요청보내서 새로 받을 수 있으면 새로고침 이슈도 해결 될 듯 하다.
  if (!token) return false;
  return axios
    .get('http://localhost:4000/users/authcheck', {
      headers: { authorization: `Bearer ${token}` },
    })
    .then(({ data }) => {
      return data;
    })
    .catch(err => err);
}

export default () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ result: '' });
  const result = useSelector(dat => {
    return dat.login ? dat.login : false;
  });
  const handler = async () => {
    console.log(result);
    const checkedAuth = await checkAuth(result);
    if (checkedAuth.isAuth) {
      dispatch(tokenHandler(result));
    }
    setData({ result: checkedAuth });
  };
  return [data, handler];
};

// export default () => {
//   console.log(1);
//   const dispatch = useDispatch();
//   const result = useSelector(dat => {
//     return dat.login ? dat.login : false;
//   });
//   const [init, setInit] = useState('');
//   const [data, setData] = useState({ result: '' });
//   console.log(2);
//   useEffect(async () => {
//     const checkedAuth = await checkAuth(result);
//     if (checkedAuth.isAuth) {
//       dispatch(tokenHandler(data.accessToken));
//     }
//     setData({ result: checkedAuth });
//   }, [init]);
//   console.log(3);
//   const handler = () => {
//     console.log(4);
//     setInit(Math.random());
//   };

//   return [data, handler];
// };

// export default () => {
//   const [random, setRandom] = useState();
//   const [key, setKey] = useState({ default: '' });
//   const [data, setData] = useState();
//   const storeData = useSelector(dat => {
//     return dat[key[random]];
//   });
//   useEffect(() => {
//     setData({ ...storeData });
//   }, [random]);
//   const handler = val => {
//     const v = Math.random();
//     setKey({ [v]: val });
//     setRandom(v);
//   };
//   return [data, handler];
// };
