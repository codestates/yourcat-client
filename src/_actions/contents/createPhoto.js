import axios from 'axios';

export default function createPhoto(userData) {
  console.log('userData는 ', userData);
  const config = {
    headers: {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDhlNjU3ZmY3NGY4ODNjNTRiYzcyZTEiLCJpYXQiOjE2MTk5NDQ5MTEsImV4cCI6MTYxOTk1NTcxMX0.EXPkFMz1iyY2xp86d_EGKRLWrgSKpLFLv49k3TMjtFY',
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
