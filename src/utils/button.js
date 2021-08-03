import styled from 'styled-components';

export const ButtonContainer = styled('div')`
  height: 50px;
  margin: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Button = styled('button')`
  width: 100px;
  height: 30px;
  background-color: #ffc5a1;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 700;
  border: none;
  margin: 5px;
  &:hover {
    background-color: #f8a978;
  }
`;
