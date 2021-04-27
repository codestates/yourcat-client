import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import validation from '../../../utils/validator';
import loginUserData from '../../../_actions/loginUser';

const ButtonContainer = styled.div`
  width: 200px;
  box-sizing: border-box;
`;
const Button = styled.button`
  width: 40%;
  margin: 0 5%;
`;
const Container = styled.div`
  border: 1px solid black;
  display: flex;
  width: 200px;
  height: 20px;
  background: ${props => (props.isValid ? `#FFD2D2` : 'none')};
  border-radius: 2px;
  margin: 1rem 0;
`;
const Input = styled.input`
  all: unset;
  flex: 1 1 0;
  width: 100px;
`;
// position: absolute;
const ErrMsg = styled.span`
  position: absolute;
  pointer-events: none;
  left: 120px;
  font-style: italic;
  font-size: 0.5em;
  color: #fd0202;
`;

const LoginModal = () => {
  const dispatch = useDispatch();
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: '',
  });
  const [errMessage, setErrorMessage] = useState({ email: '', password: '' });
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
  const handleLogin = () => {
    const { email, password } = errMessage;
    if (email || password) {
      console.log('이메일과 비밀번호를 다시 확인해주세요');
    } else {
      const a = dispatch(loginUserData({ email, password }));
      console.log(a);
    }
  };
  const handleSignUp = () => {};
  return (
    <>
      <span>Login</span>
      <form onSubmit={e => e.preventDefault()}>
        <Container isValid={errMessage.email}>
          <Input
            key="email"
            onBlur={handleBlur('email')}
            onChange={handleChange('email')}
            value={loginInfo.email || ''}
            placeholder="Email"
          />
          <ErrMsg>{errMessage.email ? errMessage.email : null}</ErrMsg>
        </Container>
        <Container isValid={errMessage.password}>
          <Input
            key="password"
            type="password"
            onBlur={handleBlur('password')}
            onChange={handleChange('password')}
            value={loginInfo.password || ''}
            placeholder="Password"
          />
          <ErrMsg>{errMessage.password ? errMessage.password : null}</ErrMsg>
        </Container>
      </form>
      <ButtonContainer>
        <Button type="button" onClick={handleSignUp}>
          회원가입
        </Button>
        <Button type="submit" onClick={handleLogin}>
          로그인
        </Button>
      </ButtonContainer>
    </>
  );
};

export default LoginModal;
