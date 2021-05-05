import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Button = styled('button')`
  background-color: white;
  color: grey;
  border-radius: 5px;
  font-size: 17px;
  font-weight: 500;
  border: none;
  margin-top: 20px;
  &:hover {
    color: black;
  }
`;

export default function ErrContent() {
  const dispatch = useDispatch();
  const handleModal = () => {
    dispatch({ type: 'ERROR_MODAL_FALSE' });
    dispatch({ type: 'DELETE_ERROR_MESSAGE' });
  };
  return (
    <>
      <Button type="button" onClick={handleModal}>
        OK
      </Button>
    </>
  );
}
