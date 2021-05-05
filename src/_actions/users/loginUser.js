import axios from 'axios';

export function loginUser(data) {
  return axios
    .post('http://localhost:4000/users/login', data)
    .then(res => {
      return {
        type: 'USER_LOGIN',
        payload: res,
      };
    })
    .catch(err => {
      return {
        type: 'LOGIN_ERROR',
        payload: err,
      };
    });
}
export function tokenHandler(token) {
  return {
    type: 'STORE_TOKEN',
    payload: token,
  };
}
