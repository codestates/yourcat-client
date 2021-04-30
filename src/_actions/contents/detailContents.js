export default function detailContents(data) {
  const request = data;
  return {
    type: 'DETAIL_CONTENT',
    payload: request,
  };
}
