export default function (state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case 'DETAIL_CONTENT':
      return payload;
    default:
      return state;
  }
}

// 확인을 위해 더미로 작업하고 실제 구동은 contentId
