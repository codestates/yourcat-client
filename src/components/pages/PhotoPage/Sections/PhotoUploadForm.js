import React from 'react';

function PhotoUploadForm() {
  return (
    <form>
      <div>
        <div
          style={{ width: '300px', height: '300px', border: 'solid 1px black' }}
        >
          cat image
        </div>
        <button type="button">Photo Upload</button>
      </div>
      <div>
        <h4>Title</h4>
        <input />
      </div>
      <button type="submit">POST</button>
    </form>
  );
}

export default PhotoUploadForm;
