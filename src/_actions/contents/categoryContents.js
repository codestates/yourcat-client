export default function categoryContent(data) {
  const request = data.getAll();
  return {
    type: 'CATEGORY_CONTENT',
    payload: request,
  };
}
