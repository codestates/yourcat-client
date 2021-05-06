import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Login = styled('div')`
  margin: 7.5px 20px;
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

export default function SideTab() {
  const dispatch = useDispatch();
  const handleView = () => {
    dispatch({ type: 'LOGIN_MODAL_TRUE' });
  };

  return <Login onClick={handleView}>Login</Login>;
}
