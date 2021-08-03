export default function loginreducer(state = '', action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.payload;
    case 'LOGIN_ERROR':
      return state;
    default:
      return state;
  }
}
