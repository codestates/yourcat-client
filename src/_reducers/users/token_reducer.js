export default function Token(state = '', action) {
  switch (action.type) {
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
