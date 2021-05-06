import React, { useState } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import signUpRequest from '../../../_actions/users/signUpRequest';
import ImageUploader from '../../../utils/ImageUploader';
import { MODAL, HeaderBox, HEADER } from '../../../utils/ModalHeader';
import { Button } from '../../../utils/button';

const Div = styled.div`
  display: flex;
  margin: 10px 0;
  padding: auto;
`;
const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 20px;
`;
const Input = styled.input`
  all: unset;
  border-bottom: 1px solid grey;
  margin: 10px 0;
  width: 50px;
  height: 20px;
`;
const ButtonWrap = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px 10px;
`;
const GenderBOX = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const CatInfoPage = React.memo(props => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => {
    return state.signUpData || {};
  });
  const [data, setData] = useState({
    age: '',
    name: '',
    gender: 'male',
    image: '',
  });
  const [checkGender, setCheckGender] = useState({
    male: true,
    female: false,
  });
  const handleChange = key => event => {
    setData({
      ...data,
      [key]: event.target.value,
    });
  };
  const handleCheck = event => {
    setCheckGender({
      male: false,
      female: false,
      [event.target.value]: true,
    });
    setData({
      ...data,
      gender: event.target.value,
    });
  };
  const handlePrevStep = () => {
    props.setStep('signUp');
  };
  const handleRequest = reqData => {
    dispatch(signUpRequest(reqData)).then(res => {
      if (
        res.payload &&
        res.payload.data.message === '회원가입이 완료되었습니다.'
      ) {
        alert('회원가입이 완료되었습니다.');
        dispatch({ type: 'DELETE_USER_DATA' });
        dispatch({ type: 'DELETE_USER_SIGNUP_RESPONSE' });
        props.setStep('login');
      } else {
        dispatch({ type: 'ERROR_MODAL_TRUE' });
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: '회원가입 정보를 다시 확인해주세요',
        });
      }
    });
  };
  const handleWithoutCatSubmit = () => {
    handleRequest({ ...userData });
  };
  const handleWithCatSubmit = () => {
    const { age, name, image } = data;
    if (age && name && image) {
      handleRequest({
        ...userData,
        catInfo: { ...data, gender: checkGender.male ? 'male' : 'female' },
      });
    } else {
      dispatch({ type: 'ERROR_MODAL_TRUE' });
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: '고양이 정보를 모두 작성해주세요',
      });
    }
  };
  const storeAndGetImageURL = response => {
    const truePath = response && response.data.filePath;
    if (truePath) {
      setData({ ...data, image: truePath });
    } else {
      dispatch({ type: 'ERROR_MODAL_TRUE' });
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: '응답에 실패했습니다.',
      });
    }
  };
  return (
    <MODAL>
      <HeaderBox>
        <HEADER>Cat Info</HEADER>
      </HeaderBox>
      <Section>
        <form onSubmit={event => event.preventDefault()}>
          <ImageUploader
            width={150}
            height={150}
            border="5px"
            callback={storeAndGetImageURL}
          />
          <Div>
            <span>
              month
              <Input
                name="age"
                type="number"
                min="0"
                onChange={handleChange('age')}
              />
            </span>
            <span>
              name
              <Input name="name" onChange={handleChange('name')} />
            </span>
          </Div>
          <GenderBOX>
            male
            <input
              type="checkbox"
              value="male"
              onChange={handleCheck}
              checked={checkGender.male}
            />
            female
            <input
              type="checkbox"
              value="female"
              onChange={handleCheck}
              checked={checkGender.female}
            />
          </GenderBOX>
        </form>
      </Section>
      <ButtonWrap>
        <Button type="button" onClick={handlePrevStep}>
          Back
        </Button>
        <Button type="button" onClick={handleWithoutCatSubmit}>
          Skip
        </Button>
        <Button type="button" onClick={handleWithCatSubmit}>
          Submit
        </Button>
      </ButtonWrap>
    </MODAL>
  );
});
CatInfoPage.propTypes = {
  setStep: propTypes.func.isRequired,
};

export default CatInfoPage;
