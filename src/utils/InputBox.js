import styled from 'styled-components';

export const Container = styled.div`
  border-bottom: 1px solid #badfdb;
  padding: 0 20px;
  max-width: 250px;
  width: 40vw;
  height: 25px;
  border-radius: 2px;
  margin: 10px;
`;
export const INPUTDIV = styled('div')`
  height: 50px;
  margin: 40px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  all: unset;
  width: 100%;
  height: 100%;
`;
export const ErrMsg = styled.span`
  pointer-events: none;
  position: absolute;
  right: 25px;
  padding-top: 3px;
  padding: 0 20px;
  font-style: italic;
  font-size: 0.5em;
  color: #f8a978;
`;
