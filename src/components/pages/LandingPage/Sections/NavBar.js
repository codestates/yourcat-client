import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SideTab from './SideTab';
// import Bars from './Bars';
import StyleSideBar from '../../SideBar/StyleSideBar';

const FixedNav = styled('div')`
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  top: 0;
  z-index: 9;
`;
const Nav = styled('div')`
  background-color: #badfdb;
  display: flex;
  justify-content: center;
  color: white;
  padding: 5px 100px;
  width: 100%;
`;

const Column = styled('div')`
  width: 40%;
`;

const Logo = styled('div')`
  margin: 7px 20px;
  font-size: 1.25rem;
  font-weight: 600;
`;

const Div = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Category = styled('div')`
  font-size: 0.875rem;
`;

export default function NavBar() {
  const resData = useSelector(state => state.token);
  return (
    <FixedNav>
      <Nav>
        <Column>
          <Link to="/">
            <Logo>Your Cat</Logo>
          </Link>
        </Column>

        <Div>
          <Link to="/tutorials">
            <Category>Tutorials</Category>
          </Link>
          <Link to="/community">
            <Category>Community</Category>
          </Link>
          <Link to="/photo">
            <Category>Photo</Category>
          </Link>
          <Link to="/calculator">
            <Category>Calculator</Category>
          </Link>
          <Link to="/bookmarks">
            <Category>bookmarks</Category>
          </Link>
        </Div>

        {resData ? (
          <Column>
            <StyleSideBar />
          </Column>
        ) : (
          <Column>
            <SideTab />
          </Column>
        )}
      </Nav>
    </FixedNav>
  );
}
