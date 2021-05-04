const initState = {
  photoModal: false,
};

export default function photoModalReducer(state = initState, action) {
  switch (action.type) {
    case 'PHOTO_MODAL_TRUE':
      return {
        photoModal: true,
      };
    case 'PHOTO_MODAL_FALSE':
      return {
        photoModal: false,
      };

    default:
      return state;
  }
}
