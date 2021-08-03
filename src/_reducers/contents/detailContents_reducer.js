export default function detailContentsReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case 'DETAIL_CONTENT':
      return payload;
    default:
      return state;
  }
}
