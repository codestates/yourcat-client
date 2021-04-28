export default function loginreducer(state = {}, action) {
  switch (action.type) {
    case 'MY_INFO':
      return action.payload;
    default:
      return state;
  }
}
