export default function loginreducer(state = '', action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.payload;
    case 'STORE_TOKEN':
      return action.payload || state;
    case 'GET_TOKEN':
      return state;
    case 'DELETE_TOKEN':
      return '';
    default:
      return state;
  }
}
