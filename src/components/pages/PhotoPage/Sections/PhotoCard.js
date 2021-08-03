import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import useCheckToken from '../../../../utils/Hook/useCheckToken';

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
    setDeleteContentId(event.currentTarget.className.split(' ')[2]);
  };

  useEffect(() => {
    if (user === nickname) {
      if (deleteContentId && result && result.isAuth) {
        const url = `${process.env.REACT_APP_SERVER_URL}/contents/delete/${deleteContentId}`;

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
      const realContentId = event.currentTarget.className.split(' ')[2];

      const variables = {
        isBookmark: false,
      };

      if (!likeSwitch) {
        variables.isBookmark = false;
      } else {
        variables.isBookmark = true;
      }
      const url = `${process.env.REACT_APP_SERVER_URL}/bookmarks/edit/${realContentId}`;

      const config = {
        headers: {
          authorization: `Bearer ${result.accessToken}`,
        },
      };

      axios
        .patch(url, variables, config)
        .then(() => {})
        .catch(() => '');
    }
  };

  useEffect(() => {}, [likeSwitch]);

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
