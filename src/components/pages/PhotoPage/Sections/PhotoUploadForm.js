import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import createPhoto from '../../../../_actions/contents/createPhoto';
import ImageUploader from '../../../../utils/ImageUploader';
import { Button } from '../../../../utils/button';
import { MODAL } from '../../../../utils/ModalHeader';
import useCheckToken from '../../../../utils/Hook/useCheckToken';

const INPUTDIV = styled('div')`
  height: 50px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  all: unset;
  width: 100%;
  margin: 0 10px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.3);
`;

const Wrapper = styled.div`
  width: 100%;
  height: 200%;
  background-color: rgb(0, 0, 0, 0);
  background-color: rgb(0, 0, 0, 0.2);
  position: fixed;
  margin: auto;
  top: 0;
  z-index: 10;
  display: ${props => (props.view ? 'block' : 'none')};
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 420px;
  height: 500px;
  border-radius: 5px;
  background-color: #fcf9ea;
  align-items: center;
`;
const TITLE = styled('div')`
  margin: 10px;
`;

function PhotoUploadForm({ setPhotoList }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState('');
  const ref = useRef();
  const [{ result }, setResult] = useCheckToken();

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      console.log('바깥을 클릭했다!!');
      dispatch({ type: 'PHOTO_MODAL_FALSE' });
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const onTitleHandler = event => {
    setTitle(event.currentTarget.value);
  };
  const handleRequest = reqData => {
    setResult();
    dispatch(createPhoto(reqData, result.accessToken)).then(res => {
      console.log(res);
      if (res.payload) {
        dispatch({ type: 'PHOTO_MODAL_FALSE' });
        setPhotoList([]);
      } else {
        console.log('사진 업로드에 실패했어요');
      }
    });
  };
  const handleSubmit = () => {
    if (title && photo) {
      // 모든 파일이 존재하는 경우
      handleRequest({
        title,
        category: 'photo',
        image: photo,
      });
    } else {
      console.log('');
    }
  };
  const getPhotoPath = response => {
    console.log('getphotopathres는 ', response);
    const truePath = response && response.data.filePath;
    console.log('path는 ', truePath);
    if (truePath) {
      setPhoto(truePath);
    } else {
      console.log('응답 실패');
    }
  };

  const {
    photoModal: { photoModal },
  } = useSelector(state => state);

  return (
    <Wrapper view={photoModal}>
      <Main ref={ref}>
        <MODAL>
          <div>
            <ImageUploader
              width={250}
              height={250}
              border="10px"
              callback={getPhotoPath}
            />
          </div>

          <INPUTDIV>
            <TITLE>TITLE</TITLE>
            <Input type="text" value={title} onChange={onTitleHandler} />
          </INPUTDIV>

          <Button type="button" onClick={handleSubmit}>
            POST
          </Button>
        </MODAL>
      </Main>
    </Wrapper>
  );
}
PhotoUploadForm.propTypes = {
  setPhotoList: propTypes.func.isRequired,
};
export default PhotoUploadForm;
