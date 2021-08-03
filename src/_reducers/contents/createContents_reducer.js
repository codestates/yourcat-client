export default function createContentsReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case 'CREATE_CONTENT':
      return [...state, payload];
    default:
      return state;
  }
}
