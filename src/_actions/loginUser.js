import axios from 'axios';

export function loginUser(data) {
  const request = axios.get('https://localhost:4000/'); // 원래는 post
  console.log(data);
  return {
    type: 'USER_LOGIN',
    payload: request,
  };
}
export function getUserInfo() {
  const request = axios.get('https://localhost:4000/', {
    withCredentials: true,
  });
  return {
    type: 'MY_INFO',
    payload: request,
  };
}
