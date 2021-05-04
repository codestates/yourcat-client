import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PhotoCard from './Sections/PhotoCard';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const HEADER = styled('div')`
  margin: 10px 150px;
  margin-top: 50px;
  padding: 10px;
  color: #f8a978;
  font-size: 30px;
`;

export default function PhotoPage() {
  const [photoList, setPhotoList] = useState([]);

  const url = `http://localhost:4000/contents/photo`;

  useEffect(() => {
    axios
      .post(url)
      .then(response => {
        console.log('res.data는 ', response.data);
        const result = response.data.contentsList;
        console.log('result', result);
        setPhotoList(result);
      })
      .catch(err => console.log(err));
  }, []);

  const classes = useStyles();
  return (
    <>
      <HEADER>Cat Photo</HEADER>
      <div
        className={classes.root}
        style={{
          paddingTop: '100px',
          padding: '50px',
          backgroundColor: '#fcf9ea',
        }}
      >
        <Grid container spacing={3}>
          {photoList.map(photo => (
            <Grid item lg={3} md={4} xs={12}>
              <PhotoCard
                userAvatar={photo.userImage}
                user={photo.user.userName}
                image={photo.contentImage}
                title={photo.title}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
