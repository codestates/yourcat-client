import React from 'react';
// import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import PhotoBookMarkCard from './PhotoBookMarkCard';
import CommunityBookMark from './CommunityBookMark';

function BookMarkContents({ category, bookmarks = [] }) {
  const data = bookmarks.reduce(
    (result, { contentId }) => {
      return {
        ...result,
        [contentId.category]: [...result[contentId.category], contentId],
      };
    },
    { general: [], photo: [], knowhow: [], question: [] },
  );
  return category === 'Photo' ? (
    <>
      <Grid container spacing={3}>
        {data.photo.map(({ _id, image, title, userId: { nickname } }) => {
          return (
            <Grid key={_id} item lg={3} md={4} xs={12}>
              <PhotoBookMarkCard
                image={image}
                title={title}
                nickname={nickname}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  ) : (
    <>
      {['general', 'knowhow', 'question'].map(type => (
        <CommunityBookMark data={data[type]} division={type} />
      ))}
    </>
  );
}
BookMarkContents.propTypes = {
  category: propTypes.string.isRequired,
  bookmarks: propTypes.arrayOf(propTypes.object).isRequired,
};

export default BookMarkContents;
/**
 * 1) 토큰확인 // 마이페이지 들어갔을 때 토큰 갱신될텐데 굳이?
 *  2-1) 토큰들고 get 요청
 *  2-2) 유효한 토큰이면 토큰들고 get 요청
 */

//  import React from 'react';
//  import propTypes from 'prop-types';
//  import Grid from '@material-ui/core/Grid';

//  function BookMarkContents({ category }) {
//    const bookmarks = useSelector(({ bookMark }) => {
//      return category === 'Photo' ? bookMark.photo : bookMark.community;
//    });
//    console.log(bookmarks);
//    return category === 'Photo' ? (
//      <>
//        <Grid container spacing={3}>
//          {bookmarks.map(bookmark => {
//            return (
//              <Grid item lg={3} md={4} xs={12}>
//                <PhotoBookMarkCard
//                  image={bookmark.image}
//                  title={bookmark.title}
//                  nickname={bookmark.userId.nickname}
//                />
//              </Grid>
//            );
//          })}
//        </Grid>
//      </>
//    ) : (
//      <>
//      </>
//    );
//  }
//  BookMarkContents.propTypes = {
//    category: propTypes.string.isRequired,
//  };
// propTypes.shape({
//   contentId: propTypes.shape({
//     category: propTypes.string,
//     title: propTypes.string,
//     image: propTypes.string,
//     _id: propTypes.string,
//     userId: propTypes.shape({
//       _id: propTypes.string,
//       nickname: propTypes.string,
//     }),
//   }),
// }),
