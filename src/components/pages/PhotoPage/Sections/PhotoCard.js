import React from 'react';
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
    paddingTop: '56.25%', // 16:9
  },
}));
// cardheader : avatar-src: user고양이프로필사진
// cardheader : title: user 닉네임
// cardmedia.image : 업로드한 사진
// cardcontent.typography : 업로드한 제목
// response.data하면 촤르륵 나와요오
// contents list(배열) 안에 contents가 촤르륵
// 하나의 컨텐츠 안에 userId
export default function PhotoCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src="http://placekitten.com/300/400" />
        }
        title="JawsJaws"
      />
      <CardMedia
        className={classes.media}
        image="http://placekitten.com/500/400"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook.
        </Typography>
      </CardContent>
    </Card>
  );
}
