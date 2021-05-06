import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const barsIcon = <FontAwesomeIcon icon={faBars} />;

const BARS = styled('div')`
  margin: 7.5px 20px;
  font-size: 0.875rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  color: white;
`;

function Bars() {
  return <BARS>{barsIcon}</BARS>;
}

export default Bars;
