import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import fileHandler from '../_actions/fileHandler';

const Button = styled.button`
  /* Insert your favorite CSS code to style a button */
  all: unset;
  margin: 0;
  box-sizing: border-box;
  text-align: center;
  cursor: Pointer;
  background: white;
  border: 1px solid grey;
  border-radius: 1px;
  width: ${props => props.width - 2}px;
  height: 20px;
  top: ${props => props.height + 10}px;
  position: absolute;
  &:hover {
    background-color: grey;
    color: black;
  }
`;
const Container = styled.section`
  box-sizing: border-box;
  border: 1px solid grey;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

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
const FileUploader = props => {
  const { width, height, border } = props;
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const hiddenFileInput = React.useRef(null);
  useEffect(() => {
    if (file !== '') {
      setPreview(imgTagGenerator(width, height, border, previewURL));
    }
  }, [previewURL]);

  const handleChange = event => {
    const reader = new FileReader();
    const fileData = event.target.files[0];
    reader.onloadend = () => {
      setFile(fileData);
      dispatch(fileHandler(fileData));
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
    <Container width={width} height={height}>
      {preview}
      <Button onClick={handleClick} width={width} height={height}>
        Upload Photo
      </Button>
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
  );
};
FileUploader.propTypes = {
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  border: propTypes.string.isRequired,
};
export default FileUploader;
