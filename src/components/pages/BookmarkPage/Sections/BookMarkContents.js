import React from 'react';
// import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import PhotoBookMarkCard from './PhotoBookMarkCard';
import CommunityBookMark from './CommunityBookMark';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

function BookMarkContents({ category, bookmarks = [] }) {
  const classes = useStyles();
  const data = bookmarks.reduce(
    (result, bookmark) => {
      return bookmark.contentId
        ? {
            ...result,
            [bookmark.contentId.category]: [
              ...result[bookmark.contentId.category],
              bookmark.contentId,
            ],
          }
        : result;
    },
    { general: [], photo: [], knowhow: [], question: [] },
  );
  return category === 'Photo' ? (
    <div
      className={classes.root}
      style={{
        padding: '20px 30px',
        backgroundColor: '#fcf9ea',
      }}
    >
      <Grid
        container
        spacing={3}
        style={{
          paddingTop: '10px',
        }}
      >
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
    </div>
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
// })
*/
