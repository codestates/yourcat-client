export default function signUpReducer(state = {}, action) {
  switch (action.type) {
    case 'USER_SIGNUP':
      return action.payload;
    default:
      return state;
  }
}
