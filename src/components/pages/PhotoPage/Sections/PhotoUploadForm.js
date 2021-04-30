import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import fileHandler from '../../../../_actions/fileHandler';

const Button = styled.button`
  /* Insert your favorite CSS code to style a button */
  all: unset;
  margin: 0;
  box-sizing: border-box;
  text-align: center;
  cursor: Pointer;
  background: white;
  border: 1px solid grey;
  border-radius: 2px;
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
  border-radius: ${props => props.border};
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

const PhotoUploadForm = props => {
  const { width, height, border } = props;
  const [title, setTitle] = useState('');

  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const hiddenFileInput = React.useRef(null);

  const onTitleHandler = event => {
    setTitle(event.currentTarget.value);
  };

  useEffect(() => {
    if (file !== '') {
      setPreview(imgTagGenerator(width, height, border, previewURL));
    }
  }, [previewURL]);

  const handleChange = async event => {
    const reader = new FileReader();
    const formData = new FormData();
    const fileData = event.target.files[0];
    formData.append('image', fileData);

    const response = await axios.post(
      'http://localhost:4000/images/upload',
      formData,
    );
    console.log('response: ', response);
    console.log('파일경로: ', response.data.filePath);
    const truePath = response.data.filePath.split('/')[1];

    setImage(truePath);
    console.log('fileData: ', fileData);

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
    <Container width={width} height={height} border={border}>
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
      <div>
        <img
          style={{
            width: '300px',
            height: '240px',
            position: 'absolute',
            right: '50px',
          }}
          alt="df"
          src={`http://localhost:4000/${image}`}
        />
      </div>
      <form>
        <div>
          <h4>Title</h4>
          <input
            type="text"
            value={title}
            placeholder="title"
            onChange={onTitleHandler}
          />
        </div>
        <br />
        <br />
        <button type="submit">POST</button>
      </form>
    </Container>
  );
};

PhotoUploadForm.propTypes = {
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  border: propTypes.string.isRequired,
};

export default PhotoUploadForm;

// // import FileUploader from '../../../../utils/ImageUploader';

// function PhotoUploadForm() {
//   const [title, setTitle] = useState('');

//   const onTitleHandler = event => {
//     setTitle(event.currentTarget.value);
//   };

//   const dropHandler = photos => {
//     const formData = new FormData();
//     const config = {
//       header: { 'content=type': 'multipart/form-data' },
//     };
//     formData.append('photo', photos[0]);

//     axios.post('/contents/create', formData, config).then(response => {
//       if (response.data.success) {
//         alert('성공');
//       } else {
//         alert('파일을 저장하는데 실패했습니다');
//       }
//     });
//   };

//   return (
//     <>
//       <div>
//         <FileUploader
//           onDrop={dropHandler}
//           width={300}
//           height={300}
//           border="10px"
//         />
//       </div>
//       <br />
//       <br />
//       <br />
//       <form>
//         <div>
//           <h4>Title</h4>
//           <input
//             type="text"
//             value={title}
//             placeholder="title"
//             onChange={onTitleHandler}
//           />
//         </div>
//         <br />
//         <br />
//         <button type="submit">POST</button>
//       </form>
//     </>
//   );
// }

// export default PhotoUploadForm;
