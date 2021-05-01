import React, { useState } from 'react';
import LoginModal from '../LoginPage/LoginModal';
import SignUpModal from '../SignUpPage/SignUpPage';
import CatInfoPage from '../CatInfoPage/CatInfoPage';

function MultiStepForm() {
  const [step, setStep] = useState('login');
  // eslint-disable-next-line prefer-const
  let id = step;
  // TODO : state가 변경됨에 따라 style 변경.
  switch (id) {
    case 'login':
      return <LoginModal setStep={setStep} />;
    case 'signUp':
      return <SignUpModal setStep={setStep} />;
    case 'catInfo':
      return <CatInfoPage setStep={setStep} />;
    default:
      return null;
  }
}

export default MultiStepForm;
