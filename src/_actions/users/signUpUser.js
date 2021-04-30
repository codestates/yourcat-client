export default function signUpUser(data) {
  return {
    type: 'SIGNUP_DATA',
    payload: data,
  };
}
