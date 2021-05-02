export default function signUpDataReducer(state = {}, action) {
  switch (action.type) {
    case 'SIGNUP_DATA':
      return action.payload;
    case 'DELETE_USER_DATA':
      return {};
    default:
      return state;
  }
}
