import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

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
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import catImage from '../../../../images/catProfile.png';

const CAT = styled('img')`
  width: 80%;
  border-radius: 5%;
`;

CAT.defaultProps = {
  src: catImage,
};

const heartIcon = <FontAwesomeIcon icon={faHeart} />;

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
  const classes = useStyles();
  const { user, image, title } = props;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar>
            <CAT />
          </Avatar>
        }
        action={
          <IconButton aria-label="add to favorites">{heartIcon}</IconButton>
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
  user: propTypes.string.isRequired,
  image: propTypes.string.isRequired,

  title: propTypes.string.isRequired,
};
