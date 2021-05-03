import React, { useState } from 'react';
import styled from 'styled-components';
// import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import createPhoto from '../../../../_actions/contents/createPhoto';
import ImageUploader from '../../../../utils/ImageUploader';
import { Button } from '../../../../utils/button';
import { MODAL } from '../../../../utils/ModalHeader';

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
  z-index: 1;
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

function PhotoUploadForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState('');
  const onTitleHandler = event => {
    setTitle(event.currentTarget.value);
  };
  const handleRequest = reqData => {
    dispatch(createPhoto(reqData)).then(res => {
      console.log(res);
      if (res.payload) {
        alert('성공!');
      } else {
        console.log('something wrong');
      }
    });
  };
  const handleSubmit = () => {
    if (title && photo) {
      // 모든 파일이 존재하는 경우
      handleRequest({
        title,
        category: 'photo',
        img: photo,
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
  return (
    <Wrapper>
      <Main>
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
export default PhotoUploadForm;
// ------------------------------------------------
// ----------------------
// // post 요청 보내는 곳
// const url = 'http://localhost:4000/images/upload';
// // 렌더링 되는 엘리먼트 스타일링
// const Button = styled.button`
//   /* Insert your favorite CSS code to style a button */
//   all: unset;
//   margin: 0;
//   box-sizing: border-box;
//   text-align: center;
//   cursor: Pointer;
//   background: white;
//   border: 1px solid grey;
//   border-radius: 2px;
//   width: ${props => props.width - 2}px;
//   height: 20px;
//   top: ${props => props.height + 10}px;
//   position: absolute;
//   &:hover {
//     background-color: grey;
//     color: black;
//   }
// `;
// const Container = styled.section`
//   box-sizing: border-box;
//   border: 1px solid grey;
//   border-radius: ${props => props.border};
//   width: ${props => props.width}px;
//   height: ${props => props.height}px;
// `;
// // --------------------------------------------------------------------------------------------------
// // img 태그 조절용
// //
// // 매개변수 :
// // --- width, height, border : ImageUploader 엘리먼트가 props로 받아온 스타일링 데이터
// // --- src : 렌더링 되는 이미지 source
// // --------------------------------------------------------------------------------------------------
// function imgTagGenerator(width, height, border, src) {
//   return (
//     <img
//       alt=""
//       width={`${width}px`}
//       height={`${height}px`}
//       style={{
//         borderRadius: `${border}`,
//         position: 'absolute',
//       }}
//       src={src}
//     />
//   );
// }
// // --------------------------------------------------------------------------------------------------
// // post 요청
// //
// // 매개변수 :
// // --- formData : 요청보낼 formData
// // --- cb : ImageUploader 엘리먼트가 props로 받아온 콜백함수
// // --------------------------------------------------------------------------------------------------
// // @ TODO : 전달해주는 콜백함수에 추가해야 될 부분.
// //
// // console.log('response: ', response);
// // console.log('파일경로: ', response.data.filePath);
// // const truePath = response.data.filePath.split('/')[1];
// // ?? setImage(truePath) ??
// // --------------------------------------------------------------------------------------------------
// function postRequest(formData, cb) {
//   // const config = {
//   //   header: { 'content-type': 'multipart/form-data' },
//   // };
//   axios
//     .post(url, formData)
//     .then(res => {
//       console.log('res:::', res);
//       cb(res);
//     })
//     .catch(err => console.log('err::', err));
// }
// // --------------------------------------------------------------------------------------------------
// // ImageUploader 엘리먼트
// //
// // 매개변수 총 4개.
// // 1) ImageUploader 엘리먼트가 props로 받아온 스타일링 데이터
// // --- width(number)
// // --- height(number)
// // --- border("5px", "50%", ... 등등 => borderRadius: `${border}`);
// //
// // 2) post 요청으로 응답받는 데이터를 상위로 전달하기 위한 역할
// // --- callback : ImageUploader 엘리먼트가 props로 받아온 콜백함수
// // --------------------------------------------------------------------------------------------------
// const PhotoUploadForm = props => {
//   const [title, setTitle] = useState('');
//   const formData = new FormData();
//   const onTitleHandler = event => {
//     setTitle(event.currentTarget.value);
//   };
//   const { width, height, border, callback } = props;
//   const [file, setFile] = useState('');
//   const [previewURL, setPreviewURL] = useState('');
//   const [preview, setPreview] = useState(null);
//   const hiddenFileInput = React.useRef(null);
//   useEffect(() => {
//     if (file) {
//       setPreview(imgTagGenerator(width, height, border, previewURL));
//     }
//   }, [previewURL]);
//   const handleChange = event => {
//     const reader = new FileReader();
//     const fileData = event.target.files[0];
//     reader.onloadend = () => {
//       setFile(fileData);
//       setPreviewURL(reader.result);
//     };
//     if (fileData) {
//       reader.readAsDataURL(fileData);
//     }
//   };
//   const handleClick = () => {
//     hiddenFileInput.current.click();
//   };
//   const postButtonHandler = () => {
//     const newFormData = new FormData();
//     newFormData.append('image', file);
//     console.log('file::', file);
//     formData.append('title', title);
//     console.log('newFormData::', newFormData.has('file'));
//     postRequest(formData, callback);
//   };
//   return (
//     <>
//       <Container width={width} height={height} border={border}>
//         {preview}
//         <Button onClick={handleClick} width={width} height={height}>
//           Upload Photo
//         </Button>
//         <label htmlFor="file">
//           <input
//             type="file"
//             accept=".gif, .jpg, .png"
//             ref={hiddenFileInput}
//             onChange={handleChange}
//             style={{ display: 'none' }}
//           />
//         </label>
//       </Container>
//       <br />
//       <br />
//       <br />
//       <br />
//       <div>
//         <h4>Title</h4>
//         <input
//           type="text"
//           value={title}
//           placeholder="title"
//           onChange={onTitleHandler}
//         />
//       </div>
//       <br />
//       <br />
//       <button type="button" onClick={postButtonHandler}>
//         POST
//       </button>
//     </>
//   );
// };
// PhotoUploadForm.propTypes = {
//   width: propTypes.number.isRequired,
//   height: propTypes.number.isRequired,
//   border: propTypes.string.isRequired,
//   callback: propTypes.func.isRequired,
// };
// export default PhotoUploadForm;
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
