import React, { useState } from 'react';
// import styled from 'styled-components';
import validator from '../../../utils/validator';
import { Container, Input, ErrMsg } from '../../../utils/InputBox';
import { ButtonContainer, Button } from '../../../utils/button';

const SignUpModal = React.memo(() => {
  const [formData, setFormData] = useState({
    signupNickname: '',
    email: '',
    signupPassword: '',
    confirmsignupPassword: '',
  });
  const [errMessage, setErrMessage] = useState({
    signupNickname: '',
    email: '',
    signupPassword: '',
    confirmsignupPassword: '',
  });
  const handleData = key => event => {
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
  };
  const handleBlur = key => event => {
    const isError =
      key === 'confirmPassword'
        ? validator({
            value: {
              first: formData.signupPassword,
              second: event.target.value,
            },
            type: key,
          })
        : validator({ value: event.target.value, type: key });
    if (isError[key]) {
      setErrMessage({ ...errMessage, [key]: isError[key] });
    } else {
      setErrMessage({ ...errMessage, [key]: '' });
    }
  };
  const handleFocus = key => () => {
    setErrMessage({ ...errMessage, [key]: '' });
  };
  const handleCatInfoClick = () => {};
  const handleCalcelClick = () => {};

  return (
    <section>
      <form onSubmit={event => event.preventDefault}>
        {['signupNickname', 'email', 'signupPassword', 'confirmPassword'].map(
          key => {
            return (
              <Container key={key}>
                <Input
                  type={key.includes('Password') ? 'password' : 'text'}
                  onChange={handleData(key)}
                  onBlur={handleBlur(key)}
                  onFocus={handleFocus(key)}
                  value={formData[key] || ''}
                />
                <ErrMsg>{errMessage[key] ? errMessage[key] : null}</ErrMsg>
              </Container>
            );
          },
        )}
      </form>
      <ButtonContainer>
        <Button type="button" onClick={handleCatInfoClick}>
          다음
        </Button>
        <Button type="button" onClick={handleCalcelClick}>
          취소
        </Button>
      </ButtonContainer>
    </section>
  );
});
export default SignUpModal;
