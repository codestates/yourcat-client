import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid black;
  max-width: 250px;
  width: 40vw;
  height: 25px;
  border-radius: 2px;
  margin: 1rem 0;
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
  font-style: italic;
  font-size: 0.5em;
  color: #fd0202;
`;
