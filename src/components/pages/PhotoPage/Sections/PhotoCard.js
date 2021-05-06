import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import useCheckToken from '../../../../utils/Hook/useCheckToken';

// import catImage from '../../../../images/catProfile.png';

// const CAT = styled('img')`
//   width: 80%;
//   border-radius: 5%;
// `;

// CAT.defaultProps = {
//   src: catImage,
// };

const heartIcon = <FontAwesomeIcon icon={faHeart} />;
const trashIcon = <FontAwesomeIcon icon={faTrashAlt} />;

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 250,
    paddingTop: '56.25%', // 16:9
  },
}));

// FIXME: setState 비동기 해결
export default function PhotoCard(props) {
  const {
    userAvatar,
    user,
    image,
    title,
    contentId,
    bookmark,
    setReRender,
  } = props;
  const [likeSwitch, setLikeSwitch] = useState(bookmark);
  const [{ result }, setResult] = useCheckToken();
  const classes = useStyles();
  const { nickname } = useSelector(dat => dat.getUserInfo);
  const [deleteContentId, setDeleteContentId] = useState('');
  const deleteButtonHandler = event => {
    console.log('삭제contentId는', event.currentTarget.className.split(' ')[2]);
    setDeleteContentId(event.currentTarget.className.split(' ')[2]);
  };

  useEffect(() => {
    if (user === nickname) {
      if (deleteContentId && result && result.isAuth) {
        console.log('deleteid', deleteContentId);
        console.log('axios');

        const url = `http://localhost:4000/contents/delete/${deleteContentId}`;

        const config = {
          headers: {
            authorization: `Bearer ${result.accessToken}`,
          },
        };

        axios
          .delete(url, config)
          .then(response => {
            if (response) {
              setReRender([]);
            }
          })
          .catch(() => {});
      }
    }
  }, [deleteContentId]);

  const onLikeHandler = event => {
    setResult();
    if (result.isAuth) {
      setLikeSwitch(!likeSwitch);
      console.log('contentId는', event.currentTarget.className.split(' ')[2]);
      const realContentId = event.currentTarget.className.split(' ')[2];

      const variables = {
        isBookmark: false,
      };

      if (!likeSwitch) {
        console.log('북마크에 추가');
        variables.isBookmark = false;
      } else {
        console.log('북마크에서 삭제');
        variables.isBookmark = true;
      }
      const url = `http://localhost:4000/bookmarks/edit/${realContentId}`;

      const config = {
        headers: {
          authorization: `Bearer ${result.accessToken}`,
        },
      };

      axios
        .patch(url, variables, config)
        .then(() => {})
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    console.log('likeSwitch', likeSwitch);
  }, [likeSwitch]);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar src={userAvatar} />}
        action={
          <>
            <IconButton
              onClick={deleteButtonHandler}
              className={contentId}
              style={{ color: '#d1d1cf' }}
            >
              {trashIcon}
            </IconButton>

            <IconButton
              className={contentId}
              aria-label="add to favorites"
              onClick={onLikeHandler}
              style={likeSwitch ? { color: '#f8a978' } : { color: '#badfdb' }}
            >
              {heartIcon}
            </IconButton>
          </>
        }
        title={user}
      />
      <CardMedia className={classes.media} image={image} title="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

PhotoCard.propTypes = {
  userAvatar: propTypes.string.isRequired,
  user: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  contentId: propTypes.string.isRequired,
  bookmark: propTypes.bool.isRequired,
  setReRender: propTypes.func.isRequired,
};
