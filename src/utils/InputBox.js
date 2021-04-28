import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid black;
  width: 200px;
  height: 20px;
  border-radius: 2px;
  margin: 1rem 0;
`;
export const Input = styled.input`
  all: unset;
  width: 100%;
  height: 100%;
`;
export const ErrMsg = styled.span`
  position: absolute;
  pointer-events: none;
  left: 120px;
  font-style: italic;
  font-size: 0.5em;
  color: #fd0202;
`;
