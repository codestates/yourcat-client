import React from 'react';
import styled from 'styled-components';

const Nav = styled('div')`
  background-color: #badfdb;
  display: flex;

  justify-content: center;
  color: white;
  padding: 5px;
`;
const Column = styled('div')`
  width: 33%;
`;
const Logo = styled('div')`
  margin: 7px 20px;

  font-size: 20px;

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
  font-size: 14px;
`;

const SideTab = styled('div')`
  margin: 7px 20px;
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default function NavBar() {
  return (
    <Nav>
      <Column>
        <Logo>Your Cat</Logo>
      </Column>

      <Div>
        <Category>Tutorials</Category>
        <Category>Community</Category>
        <Category>Photo</Category>
        <Category>Calculator</Category>
      </Div>

      <Column>
        <SideTab>Login</SideTab>
      </Column>
    </Nav>
  );
}
