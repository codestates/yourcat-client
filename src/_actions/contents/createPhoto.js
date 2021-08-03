import axios from 'axios';

export default function createPhoto(userData, token) {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/contents/create`,
      userData,
      config,
    )

    .catch(() => '');

  return {
    type: 'CREATE_PHOTO',
    payload: response,
  };
}
