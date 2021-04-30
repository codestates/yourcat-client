import axios from 'axios';

export function loginUser(data) {
  const request = axios
    .post('http://localhost:4000/users/login', data)
    .catch(() => '');
  return {
    type: 'USER_LOGIN',
    payload: request,
  };
}
export function tokenHandler(token) {
  return {
    type: 'STORE_TOKEN',
    payload: token,
  };
}
