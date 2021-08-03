import axios from 'axios';

export function loginUser(data) {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/users/login`, data)
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
