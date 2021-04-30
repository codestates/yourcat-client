const initState = {
  title: '클릭했을 때, 상세페이지제목입니다.',
  description: '상세페이지 내용입니다.',
  like: 3,
  image: 'abcd123.jpg',
  comment: [
    { nickname: '칭찬러', description: '너무에뻐요~~' },
    { nickname: '불편러', description: '안돼나요가 아니라 안되나요입니다.' },
  ],
};

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'EDIT_CONTENT':
      return [...initState, payload];
    default:
      return state;
  }
}
