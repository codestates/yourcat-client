export default function signUpReducer(state = {}, action) {
  switch (action.type) {
    case 'USER_SIGNUP':
      return action.payload;
    case 'DELETE_USER_SIGNUP_RESPONSE':
      return {};
    default:
      return state;
  }
}
