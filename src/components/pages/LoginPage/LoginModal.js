import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validation from '../../../utils/validator';
import loginUserData from '../../../_actions/loginUser';

const LoginModal = () => {
  const dispatch = useDispatch();
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: '',
    isValid: { email: false, password: false },
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
      setloginInfo({
        ...loginInfo,
        isValid: { ...loginInfo.isValid, [key]: false },
      });
    } else {
      setloginInfo({
        ...loginInfo,
        isValid: { ...loginInfo.isValid, [key]: true },
      });
    }
  };
  const handleLogin = () => {
    const { email, password } = loginInfo.isValid;
    if (!email || !password) {
      console.log('이메일과 비밀번호를 다시 확인해주세요');
    } else {
      const a = dispatch(loginUserData({ email, password }));
      console.log(a);
    }
  };
  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <input
          key="email"
          onBlur={handleBlur('email')}
          onChange={handleChange('email')}
          value={loginInfo.email || ''}
        />
        <input
          key="password"
          onBlur={handleBlur('password')}
          onChange={handleChange('password')}
          value={loginInfo.password || ''}
        />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </>
  );
};

export default LoginModal;
