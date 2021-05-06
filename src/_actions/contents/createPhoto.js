import axios from 'axios';

export default function createPhoto(userData, token) {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = axios
    .post('http://localhost:4000/contents/create', userData, config)

    .catch(() => '');

  return {
    type: 'CREATE_PHOTO',
    payload: response,
  };
}
