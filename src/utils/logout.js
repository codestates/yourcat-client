import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import useCheckToken from './Hook/useCheckToken';

const email = useSelector(({ getUserInfo }) => getUserInfo.email);
const [{ result }, setResult] = useCheckToken();
const dispatch = useDispatch();
const handleClick = () => {
  setResult();
  if (result.isAuth) {
    axios
      .post(
        'http://localhost:4000/users/logout',
        { email },
        { headers: { authorization: `Bearer ${result.accessToken}` } },
      )
      .then(() => {
        dispatch({ type: 'DELETE_TOKEN' });
        dispatch({ type: 'DELETE_USERINFO' });
        alert('성공!');
      })
      .catch(e => {
        console.log(e);
        alert('오류');
        return '';
      });
  }
  // 토큰이 있다면 토큰들고 요청

  //
};
handleClick();
