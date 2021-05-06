import axios from 'axios';

export default function signUpRequest(userData) {
  const response = axios
    .post(`${process.env.REACT_APP_SERVER_URL}/users/signup`, userData)
    .catch(() => '');
  return {
    type: 'USER_SIGNUP',
    payload: response,
  };
}
