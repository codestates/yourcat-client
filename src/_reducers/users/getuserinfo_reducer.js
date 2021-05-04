export default function getUsersInfo(state = '', action) {
  switch (action.type) {
    case 'GET_USERINFO':
      return action.payload;
    default:
      return state;
  }
}
