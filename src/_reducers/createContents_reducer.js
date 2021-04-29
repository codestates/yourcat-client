export default function (state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case 'CREATE_CONTENT':
      return payload;
    default:
      return state;
  }
}
