import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import styled from 'styled-components';

import validator from '../../../utils/validator';
import { Container, Input, ErrMsg } from '../../../utils/InputBox';
import { MODAL, HeaderBox, HEADER } from '../../../utils/ModalHeader';
import { ButtonContainer, Button } from '../../../utils/button';
import signUpUser from '../../../_actions/users/signUpUser';

const INPUTDIV = styled('div')`
  height: 50px;
  margin: 70px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignUpModal = React.memo(props => {
  const dispatch = useDispatch();
  const result = useSelector(state => state.signUpData.userData);
  const [formData, setFormData] = useState({
    nickname: (result && result.nickname) || '',
    email: (result && result.email) || '',
    signupPassword: '',
    confirmsignupPassword: '',
  });
  const [errMessage, setErrMessage] = useState({
    nickname: '',
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
  const handleCatInfoClick = () => {
    if (
      !Object.values(formData).join('') ||
      Object.values(errMessage).join('')
    ) {
      dispatch({ type: 'ERROR_MODAL_TRUE' });
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: '회원가입 정보를 입력해주세요',
      });
    } else {
      const { nickname, email, signupPassword } = formData;
      dispatch(
        signUpUser({ userData: { nickname, email, password: signupPassword } }),
      );
      props.setStep('catInfo');
    }
  };
  const handleCalcelClick = () => {
    dispatch({ type: 'DELETE_USER_DATA' });
    props.setStep('login');
  };

  return (
    <MODAL>
      <HeaderBox>
        <HEADER>Sign Up</HEADER>
      </HeaderBox>
      <INPUTDIV>
        <form onSubmit={event => event.preventDefault}>
          {['nickname', 'email', 'signupPassword', 'confirmPassword'].map(
            key => {
              return (
                <Container key={key}>
                  <Input
                    placeholder={key}
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
      </INPUTDIV>
      <ButtonContainer>
        <Button type="button" onClick={handleCalcelClick}>
          Back
        </Button>
        <Button type="button" onClick={handleCatInfoClick}>
          Next
        </Button>
      </ButtonContainer>
    </MODAL>
  );
});
SignUpModal.propTypes = {
  setStep: propTypes.func.isRequired,
};
export default SignUpModal;
