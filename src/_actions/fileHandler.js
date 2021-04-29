export default function fileHandler(data) {
  return {
    type: 'PHOTO_FILE',
    payload: data,
  };
}
