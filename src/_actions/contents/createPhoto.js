import axios from 'axios';
// import { useHistory } from 'react-router-dom';

export default function createPhoto(userData, token) {
  // const history = useHistory();
  console.log('userData는 ', userData);
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
  console.log('responseData는 ', response);

  return {
    type: 'CREATE_PHOTO',
    payload: response,
  };
}
