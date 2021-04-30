import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import validator from '../../../utils/validator';
import { Container, Input, ErrMsg } from '../../../utils/InputBox';
import { ButtonContainer, Button } from '../../../utils/button';
import signUpUser from '../../../_actions/users/signUpUser';

const SignUpModal = React.memo(props => {
  const dispatch = useDispatch();
  const result = useSelector(state => state.signUpDataReducer.userData);
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
      console.log('wrong!');
    } else {
      const { nickname, email, signupPassword } = formData;
      dispatch(
        signUpUser({ userData: { nickname, email, password: signupPassword } }),
      );
      props.setStep('catInfo');
    }
  };
  const handleCalcelClick = () => {
    props.setStep('login');
  };

  return (
    <section>
      <form onSubmit={event => event.preventDefault}>
        {['nickname', 'email', 'signupPassword', 'confirmPassword'].map(key => {
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
        })}
      </form>
      <ButtonContainer>
        <Button type="button" onClick={handleCalcelClick}>
          취소
        </Button>
        <Button type="button" onClick={handleCatInfoClick}>
          다음
        </Button>
      </ButtonContainer>
    </section>
  );
});
SignUpModal.propTypes = {
  setStep: propTypes.func.isRequired,
};
export default SignUpModal;
