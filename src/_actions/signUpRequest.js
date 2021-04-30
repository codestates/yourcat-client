import axios from 'axios';

export default function signUpRequest(userData) {
  console.log(userData);
  const response = axios
    .post('http://localhost:4000/users/signup', userData)
    .catch(() => '');
  return {
    type: 'USER_SIGNUP',
    payload: response,
  };
}
