import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FixedNav = styled('div')`
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  top: 0;
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

const SideTab = styled('div')`
  margin: 7.5px 20px;
  font-size: 0.875rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default function NavBar() {
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
        </Div>

        <Column>
          <Link to="/signin">
            <SideTab>Login</SideTab>
          </Link>
        </Column>
      </Nav>
    </FixedNav>
  );
}
