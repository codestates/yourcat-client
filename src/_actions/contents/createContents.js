export default function createContent(data) {
  const request = data;
  return {
    type: 'DETAIL_CONTENT',
    payload: request,
  };
}
