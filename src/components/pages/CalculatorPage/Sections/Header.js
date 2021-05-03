import React from 'react';
import styled from 'styled-components';

const HEADER = styled('div')`
  margin: 10px 100px;
  margin-top: 50px;
  padding: 10px;
  color: #f8a978;
  font-size: 30px;
`;

export default function Header() {
  return <HEADER>Feeding Calculator</HEADER>;
}
