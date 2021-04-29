export default function photoFileReducer(state = {}, action) {
  switch (action.type) {
    case 'PHOTO_FILE':
      return action.payload;
    default:
      return state;
  }
}
