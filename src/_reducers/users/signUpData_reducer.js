export default function signUpDataReducer(state = {}, action) {
  switch (action.type) {
    case 'SIGNUP_DATA':
      console.log(action.payload);
      return action.payload;
    case 'DELETE_USER_DATA':
      return {};
    default:
      return state;
  }
}
