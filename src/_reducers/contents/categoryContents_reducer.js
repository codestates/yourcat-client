export default function categoryContetnsReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case 'CATEGORY_CONTENT':
      return payload;
    default:
      return state;
  }
}
