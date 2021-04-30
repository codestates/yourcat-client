export default function editContents(data) {
  const request = data;
  return {
    type: 'EDIT_CONTENT',
    payload: request,
  };
}
