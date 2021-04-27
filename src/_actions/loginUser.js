export default function loginUser(data) {
  const request = data;
  return {
    type: 'USER_LOGIN',
    payload: request,
  };
}
