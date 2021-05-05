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
    .post('http://localhost:4000/contents/create', userData, config)

    .catch(() => '');
  console.log('responseData는 ', response);

  return {
    type: 'CREATE_PHOTO',
    payload: response,
  };
}
