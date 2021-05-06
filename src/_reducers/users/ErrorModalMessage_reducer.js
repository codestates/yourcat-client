const initState = {
  message: '',
};
export default function ErrorModalMessagereducer(state = initState, action) {
  console.log(action);
  switch (action.type) {
    case 'SET_ERROR_MESSAGE':
      return {
        message: action.payload,
      };
    case 'DELETE_ERROR_MESSAGE':
      return initState;
    default:
      return state;
  }
}
