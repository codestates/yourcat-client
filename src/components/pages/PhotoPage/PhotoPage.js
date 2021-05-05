import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PhotoCard from './Sections/PhotoCard';
import PhotoUploadForm from './Sections/PhotoUploadForm';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const HEADER = styled('div')`
  margin: 10px 100px;
  margin-top: 50px;
  padding: 10px;
  color: #f8a978;
  font-size: 30px;
`;
const DIV = styled('div')`
  width: 100px;
  position: absolute;
  right: 50px;
  margin: 20px;
`;
const Button = styled('button')`
  width: 100px;
  height: 30px;
  background-color: #ffc5a1;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 700;
  border: none;
  &:hover {
    background-color: #f8a978;
  }
`;

export default function PhotoPage() {
  const dispatch = useDispatch();
  const [photoList, setPhotoList] = useState([]);
  const [request, setRequest] = useState([]);
  const url = `http://localhost:4000/contents/photo`;

  const modalHandler = () => {
    dispatch({ type: 'PHOTO_MODAL_TRUE' });
  };

  useEffect(() => {
    console.log('렌더렌더---------------------------');
    axios
      .post(url)
      .then(response => {
        const result = response.data.contentsList;
        console.log('result', result);
        setPhotoList(result);
      })
      .catch(err => console.log(err));
  }, [request]);

  const classes = useStyles();
  return (
    <>
      <HEADER>Cat Photo</HEADER>

      <div
        className={classes.root}
        style={{
          padding: '20px 50px',
          backgroundColor: '#fcf9ea',
        }}
      >
        <DIV>
          <Button onClick={modalHandler}>Add Photo</Button>
        </DIV>

        <Grid
          container
          spacing={3}
          style={{
            paddingTop: '80px',
          }}
        >
          {photoList.map(photo => (
            <Grid item lg={3} md={4} xs={12}>
              <PhotoCard
                userAvatar={photo.user.userImage}
                user={photo.user.userName}
                image={photo.contentImage}
                title={photo.title}
                contentId={photo.contentId}
                bookmark={photo.isBookmark}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <PhotoUploadForm setRequest={setRequest} />
    </>
  );
}
