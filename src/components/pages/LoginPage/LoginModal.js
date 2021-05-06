import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import validation from '../../../utils/validator';
import { loginUser, tokenHandler } from '../../../_actions/users/loginUser';
import { Container, INPUTDIV, Input, ErrMsg } from '../../../utils/InputBox';
import { MODAL, HeaderBox, HEADER } from '../../../utils/ModalHeader';
import getUserInfo from '../../../_actions/users/getUserInfo';
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
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: '이메일과 비밀번호를 다시 확인해주세요',
      });
      dispatch({ type: 'ERROR_MODAL_TRUE' });
    } else {
      dispatch(loginUser({ email, password })) // 서버오류처리
        .then(res => {
          const { payload } = res;
          if (payload.data) {
            const { data } = payload;
            if (data && data.accessToken) {
              dispatch(tokenHandler(data && data.accessToken));
              dispatch({ type: 'LOGIN_MODAL_FALSE' });
              dispatch(getUserInfo(data.accessToken));
            }
          } else {
            dispatch({ type: 'ERROR_MODAL_TRUE' });
            dispatch({
              type: 'SET_ERROR_MESSAGE',
              payload: '이메일과 비밀번호를 다시 확인해주세요',
            });
          }
        })
        .catch(e => {
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '이메일과 비밀번호를 다시 확인해주세요',
          });
          return e;
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
    <MODAL>
      <HeaderBox>
        <HEADER>Login</HEADER>
      </HeaderBox>

      <INPUTDIV>
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
      </INPUTDIV>

      <ButtonContainer>
        <Button type="button" onClick={handleCancel}>
          Back
        </Button>
        <Button type="button" onClick={handleSignUp}>
          Sign Up
        </Button>
        <Button type="submit" onClick={handleLogin}>
          Login
        </Button>
      </ButtonContainer>
    </MODAL>
  );
});
LoginModal.propTypes = {
  setStep: propTypes.func.isRequired,
};
export default LoginModal;
