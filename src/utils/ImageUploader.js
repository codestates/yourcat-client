import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import axios from 'axios';

// post 요청 보내는 곳
const url = `${process.env.REACT_APP_SERVER_URL}/images/upload`;

// 렌더링 되는 엘리먼트 스타일링
const Button = styled.button`
  /* Insert your favorite CSS code to style a button */
  all: unset;
  margin: 10px 0;
  box-sizing: border-box;
  text-align: center;
  cursor: Pointer;
  background: #badfdb;
  color: white;
  border: none;
  border-radius: 2px;
  width: ${props => props.width - 2}px;
  height: 20px;
  top: ${props => props.height + 10}px;

  &:hover {
    background-color: #ffc5a1;
  }
`;
const Container = styled.section`
  box-sizing: border-box;
  border: 2px solid #ffc5a1;
  border-radius: ${props => props.border};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const DIV = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
// --------------------------------------------------------------------------------------------------
// img 태그 조절용
//
// 매개변수 :
// --- width, height, border : ImageUploader 엘리먼트가 props로 받아온 스타일링 데이터
// --- src : 렌더링 되는 이미지 source
// --------------------------------------------------------------------------------------------------
function imgTagGenerator(width, height, border, src) {
  return (
    <img
      alt=""
      width={`${width}px`}
      height={`${height}px`}
      style={{
        borderRadius: `${border}`,
        position: 'absolute',
      }}
      src={src}
    />
  );
}
// --------------------------------------------------------------------------------------------------
// post 요청
//
// 매개변수 :
// --- formData : 요청보낼 formData
// --- cb : ImageUploader 엘리먼트가 props로 받아온 콜백함수
// --------------------------------------------------------------------------------------------------
// @ TODO : 전달해주는 콜백함수에 추가해야 될 부분.
//
// console.log('response: ', response);
// console.log('파일경로: ', response.data.filePath);
// const truePath = response.data.filePath.split('/')[1];
// ?? setImage(truePath) ??
// --------------------------------------------------------------------------------------------------
function postRequest(formData, cb) {
  axios
    .post(url, formData)
    .then(res => {
      console.log(res);
      cb(res);
    })
    .catch(err => console.log(err));
}
// --------------------------------------------------------------------------------------------------
// ImageUploader 엘리먼트
//
// 매개변수 총 4개.
// 1) ImageUploader 엘리먼트가 props로 받아온 스타일링 데이터
// --- width(number)
// --- height(number)
// --- border("5px", "50%", ... 등등 => borderRadius: `${border}`);
//
// 2) post 요청으로 응답받는 데이터를 상위로 전달하기 위한 역할
// --- callback : ImageUploader 엘리먼트가 props로 받아온 콜백함수
// --------------------------------------------------------------------------------------------------

const ImageUploader = props => {
  const formData = new FormData();
  const { width, height, border, callback } = props;
  const [{ file }, setFile] = useState({ file: '' });
  const [previewURL, setPreviewURL] = useState('');
  const [preview, setPreview] = useState(null);
  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    if (file !== '') {
      formData.append('image', file);
      setPreview(imgTagGenerator(width, height, border, previewURL));
      postRequest(formData, callback);
    }
  }, [previewURL]);

  const handleChange = event => {
    const reader = new FileReader();
    const fileData = event.target.files[0];
    reader.onloadend = () => {
      setFile({ file: fileData });
      setPreviewURL(reader.result);
    };
    if (fileData) {
      reader.readAsDataURL(fileData);
    }
  };
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  return (
    <DIV>
      <Container width={width} height={height} border={border}>
        {preview}

        <label htmlFor="file">
          <input
            type="file"
            accept=".gif, .jpg, .png"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </label>
      </Container>
      <Button onClick={handleClick} width={width} height={height}>
        Upload Photo
      </Button>
    </DIV>
  );
};

ImageUploader.propTypes = {
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  border: propTypes.string.isRequired,
  callback: propTypes.func.isRequired,
};
export default ImageUploader;
