import React, { useState } from 'react';

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
  return (
    <>
      <input
        key="email"
        onChange={handleChange('email')}
        value={loginInfo.email}
      />
      <input
        key="password"
        onChange={handleChange('password')}
        value={loginInfo.password}
      />
    </>
  );
};

export default LoginModal;
