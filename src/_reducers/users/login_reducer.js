export default function loginreducer(state = {}, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.payload;
    case 'STORE_TOKEN':
      return action.payload;
    case 'GET_TOKEN':
      return state;
    default:
      return state;
  }
}