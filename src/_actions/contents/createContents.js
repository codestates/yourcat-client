export default function createContent(data) {
  const request = data;
  return {
    type: 'CREATE_CONTENT',
    payload: request,
  };
}
