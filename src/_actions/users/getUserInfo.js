import axios from 'axios';

export default function getUserInfo(accessToken) {
  const url = 'http://localhost:4000/users/userinfo';
  const config = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
  const request = axios
    .get(url, config)
    .then(response => {
      return response.data;
    })
    .catch(() => '');
  return {
    type: 'GET_USERINFO',
    payload: request,
  };
}
