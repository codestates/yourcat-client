import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import validation from '../../../utils/validator';
import { loginUser, tokenHandler } from '../../../_actions/users/loginUser';
import { Container, Input, ErrMsg } from '../../../utils/InputBox';
import { ButtonContainer, Button } from '../../../utils/button';

const LoginModal = React.memo(props => {
  const dispatch = useDispatch();
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: '',
  });
  const [errMessage, setErrorMessage] = useState({
    email: ' ',
    password: ' ',
  });
  const handleChange = key => e => {
    setloginInfo({
      ...loginInfo,
      [key]: e.target.value,
    });
  };
  const handleBlur = key => e => {
    const isError = validation({ value: e.currentTarget.value, type: key });
    if (isError[key]) {
      setErrorMessage({ ...errMessage, [key]: isError[key] });
    } else {
      setErrorMessage({ ...errMessage, [key]: '' });
    }
  };
  const handleFocus = key => () => {
    setErrorMessage({ ...errMessage, [key]: '' });
  };
  const handleLogin = () => {
    const { email, password } = loginInfo;
    if (errMessage.email || errMessage.password) {
      console.log('이메일과 비밀번호를 다시 확인해주세요');
    } else {
      dispatch(loginUser({ email, password })) //
        .then(({ payload: { data } }) => {
          dispatch(tokenHandler(data.accessToken));
        });
    }
  };
  const handleSignUp = () => {
    props.setStep('signUp');
  };
  const handleCancel = () => {
    dispatch({ type: 'LOGIN_MODAL_FALSE' });
  };
  return (
    <>
      <span>Login</span>
      <form onSubmit={e => e.preventDefault()}>
        {['email', 'password'].map(key => (
          <Container key={key} isValid={errMessage[key]}>
            <Input
              type={key === 'password' ? 'password' : 'text'}
              onBlur={handleBlur(key)}
              onChange={handleChange(key)}
              onFocus={handleFocus(key)}
              value={loginInfo[key] || ''}
              placeholder={key}
            />
            <ErrMsg>{errMessage[key] ? errMessage[key] : null}</ErrMsg>
          </Container>
        ))}
      </form>
      <ButtonContainer>
        <Button type="button" onClick={handleCancel}>
          취소
        </Button>
        <Button type="button" onClick={handleSignUp}>
          회원가입
        </Button>
        <Button type="submit" onClick={handleLogin}>
          로그인
        </Button>
      </ButtonContainer>
    </>
  );
});
LoginModal.propTypes = {
  setStep: propTypes.func.isRequired,
};
export default LoginModal;
