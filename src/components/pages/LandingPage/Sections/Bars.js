import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import StyleSideBar from '../../SideBar/StyleSideBar';

const barsIcon = <FontAwesomeIcon icon={faBars} />;

const BARS = styled('div')`
  margin: 7.5px 20px;
  font-size: 1.25rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  color: white;
`;

function Bars() {
  // const handleClick = () => {
  //   StyleSideBar();
  // };
  return <BARS>{barsIcon}</BARS>;
}

export default Bars;
