import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MultiStepForm from './MultiStepForm';

const Wrapper = styled.section``;
export default function LoginModal() {
  const { userModal } = useSelector(state => state);
  console.log(userModal);
  return (
    <Wrapper>
      <MultiStepForm />
    </Wrapper>
  );
}
