const initState = {
  loginModal: false,
  errorModal: false,
};
export default function modalreducer(state = initState, action) {
  switch (action.type) {
    case 'LOGIN_MODAL_TRUE':
      return {
        ...state,
        loginModal: true,
      };
    case 'LOGIN_MODAL_FALSE':
      return {
        ...state,
        loginModal: false,
      };
    case 'ERROR_MODAL_TRUE':
      return {
        ...state,
        errorModal: true,
      };
    case 'ERROR_MODAL_FALSE':
      return {
        ...state,
        errorModal: false,
      };
    default:
      return state;
  }
}
