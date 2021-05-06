export default function (state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case 'DETAIL_CONTENT':
      return payload;
    default:
      return state;
  }
}
