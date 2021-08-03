import React from 'react';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 250,
    paddingTop: '56.25%',
  },
}));
function PhotoBookMarkCard({
  contentImage,
  title,
  userName,
  userImage,
  contentId,
}) {
  const classes = useStyles();
  return (
    <React.Fragment key={contentId}>
      <Card className={classes.root}>
        <CardHeader avatar={<Avatar src={userImage} />} title={userName} />
        <CardMedia
          className={classes.media}
          image={contentImage}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
PhotoBookMarkCard.propTypes = {
  contentImage: propTypes.string.isRequired,
  userImage: propTypes.string,
  title: propTypes.string.isRequired,
  userName: propTypes.string.isRequired,
  contentId: propTypes.string.isRequired,
};
PhotoBookMarkCard.defaultProps = {
  userImage:
    'https://testyourcat.s3.ap-northeast-2.amazonaws.com/images/1620206722377.jpg',
};
export default PhotoBookMarkCard;
