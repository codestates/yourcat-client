import axios from 'axios';

export default function createPhoto(userData) {
  console.log('userData는 ', userData);
  const response = axios
    .post('http://localhost:4000/contents/create', userData)
    .catch(() => '');
  console.log('responseData는 ', response);
  return {
    type: 'CREATE_PHOTO',
    payload: response,
  };
}
