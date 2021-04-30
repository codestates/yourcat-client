import React from 'react';
import PhotoUploadForm from './Sections/PhotoUploadForm';

export default function PhotoPage() {
  return (
    <div style={{ margin: '100px' }}>
      <PhotoUploadForm />
      <div style={{ margin: '100px' }}>
        <div
          style={{
            width: '300px',
            height: '50px',
            border: '1px solid',
            padding: '3px',
          }}
        >
          <img
            src="http://placekitten.com/g/300/200"
            alt="프로필"
            style={{
              width: '45px',
              height: '45px',

              borderRadius: '50%',
            }}
          />
        </div>
        <div
          style={{
            width: '300px',
            height: '300px',
            border: '1px solid',
            padding: '5px',
          }}
        >
          <img
            src="http://placekitten.com/300/300"
            alt="이미지"
            style={{
              width: '290px',
              height: '290px',

              borderRadius: '5%',
            }}
          />
        </div>
        <div
          style={{
            width: '300px',
            height: '50px',
            border: '1px solid',
            padding: '17px',
          }}
        >
          <h3>자는 모습도 귀여운 코이</h3>
        </div>
      </div>
    </div>
  );
}
