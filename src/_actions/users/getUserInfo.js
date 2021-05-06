import axios from 'axios';

export default function getUserInfo(accessToken) {
  console.log('accessToken 은 ', accessToken);
  const url = `${process.env.REACT_APP_SERVER_URL}/users/userinfo`;
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
