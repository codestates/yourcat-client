export default function signUpDataReducer(state = {}, action) {
  switch (action.type) {
    case 'SIGNUP_DATA':
      return action.payload;
    default:
      return state;
  }
}
