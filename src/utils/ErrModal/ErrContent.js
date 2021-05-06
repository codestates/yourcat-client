import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Button = styled('button')`
  background-color: white;
  color: grey;
  border-radius: 5px;
  font-size: 14px;
  width: 50px;
  font-weight: 400;
  border: 1px solid;
  margin-top: 20px;
  padding: 3px;
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
