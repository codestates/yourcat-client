import axios from 'axios';

export default function createPhoto(userData) {
  console.log(userData);
  const response = axios
    .post('http://localhost:4000/contents/create', userData)
    .catch(() => '');
  return {
    type: 'CREATE_PHOTO',
    payload: response,
  };
}
