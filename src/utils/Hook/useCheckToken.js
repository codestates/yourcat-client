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
  if (!token) return false;
  return axios
    .get(`${process.env.REACT_APP_SERVER_URL}/users/authcheck`, {
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
    if (checkedAuth.isAuth) {
      dispatch(tokenHandler(result));
    }
    setData({ result: checkedAuth });
  }, [result]);

  const handler = async () => {
    setData(data);
  };
  return [data, handler];
}
