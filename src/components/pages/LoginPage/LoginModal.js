import React, { useState } from 'react';
import validation from '../../../utils/validator';

const LoginModal = () => {
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: '',
  });
  const handleChange = key => e => {
    setloginInfo({
      [key]: e.target.value,
    });
  };
  const handleBlur = key => e => {
    const isError = validation({ value: e.currentTarget.value, type: key });
    if (isError[key]) {
      console.log(isError);
    }
  };
  return (
    <>
      <input
        key="email"
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        value={loginInfo.email}
      />
      <input
        key="password"
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        value={loginInfo.password}
      />
    </>
  );
};

export default LoginModal;
