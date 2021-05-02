import React from 'react';
import { useDispatch } from 'react-redux';

export default function ErrContent() {
  const dispatch = useDispatch();
  const handleModal = () => {
    dispatch({ type: 'ERROR_MODAL_FALSE' });
  };
  return (
    <>
      <button type="button" onClick={handleModal}>
        확인
      </button>
    </>
  );
}
