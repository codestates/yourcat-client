export default function photoFileReducer(state = {}, action) {
  switch (action.type) {
    case 'PHOTO_FILE':
      return {
        ...state,
        file: action.payload,
      };
    case 'SIGNUP_DATA':
      return action.payload;
    default:
      return state;
  }
}
