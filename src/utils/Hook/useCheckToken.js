import { useEffect, useState } from 'react'; // useEffect,
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { tokenHandler } from '../../_actions/users/loginUser';
// --------------------------
// const [{result}, setToken] = useCheckToken();
//   console.log(0);
//   const handleClick = () => {
//     setToken();
//     console.log(result);// {isAuth:true, ...}
//   };
// <button type="button" onClick={handleClick}>
//   asd
// </button>
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

export default function useCheckToken() {
  const dispatch = useDispatch();
  const [data, setData] = useState({ result: '' });
  const result = useSelector(dat => dat.token);
  useEffect(async () => {
    const checkedAuth = await checkAuth(result);
    console.log(checkedAuth);
    if (checkedAuth.isAuth) {
      dispatch(tokenHandler(result));
    }
    setData({ result: checkedAuth });
  }, [result]);

  const handler = async () => {
    setData(data);
  };
  console.log(data);
  return [data, handler];
}

// export default function useCheckToken() {
//   console.log(1);
//   const dispatch = useDispatch();
//   const result = useSelector(dat => {
//     return dat.login;
//   });
//   console.log(2);
//   console.log(result);
//   const [data, setData] = useState(() => result);
//   console.log(data);
//   const handler = async () => {
//     const checkedAuth = await checkAuth(result);
//     console.log(4);
//     console.log(checkedAuth);
//     if (checkedAuth.isAuth) {
//       dispatch(tokenHandler(result));
//     }
//     setData(checkedAuth);
//     console.log(5);
//   };
//   console.log(3);
//   return [data, handler];
// }
