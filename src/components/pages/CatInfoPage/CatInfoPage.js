import React, { useState } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import signUpRequest from '../../../_actions/users/signUpRequest';
import ImageUploader from '../../../utils/ImageUploader';
// import useDelete from '../../../utils/useDelete';

const Div = styled.div`
  display: flex;
  margin: 10px 0;
  padding: auto;
`;
const Section = styled.section`
  display: flex;
  margin-top: 5px;
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
`;
const Button = styled.button`
  width: 50px;
  margin: 5px;
`;
//------------------------
// 버튼 비활성화 CSS 추가 가능
//------------------------

const CatInfoPage = React.memo(props => {
  const dispatch = useDispatch();
  // const [isRemoved, setIsRemoved] = useDelete();
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
      console.log(res);
      if (
        res.payload &&
        res.payload.data.message === '회원가입이 완료되었습니다.'
      ) {
        // TODO :  -- import 해와서 모달창 팝업, 모달창 버튼에 props.setStep('login') 연결

        alert('성공!');
        dispatch({ type: 'DELETE_USER_DATA' });
        dispatch({ type: 'DELETE_USER_SIGNUP_RESPONSE' });
        props.setStep('login');
      } else {
        console.log('something wrong');
      }
    });
  };
  const handleWithoutCatSubmit = () => {
    handleRequest({ ...userData });
  };
  const handleWithCatSubmit = () => {
    const { age, name, image } = data;
    console.log(data);
    if (age && name && image) {
      // 모든 파일이 존재하는 경우
      handleRequest({
        ...userData,
        catInfo: { ...data, gender: checkGender.male ? 'male' : 'female' },
      });
    } else {
      // TODO :  -- import 해와서 모달창 팝업 '전부 요청해야됨'
      console.log('');
    }
  };
  const test = response => {
    console.log(response);
    const truePath = response && response.data.filePath.split('/')[1];
    console.log(truePath);
    if (truePath) {
      setData({ ...data, image: truePath });
    } else {
      // TODO :  -- import 해와서 모달창 팝업 서버오류
      console.log('');
    }
  };
  return (
    <>
      Cat Info
      <Section>
        <form onSubmit={event => event.preventDefault()}>
          <ImageUploader
            width={200}
            height={200}
            border="5px"
            callback={test}
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
          <div>
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
          </div>
        </form>
      </Section>
      <ButtonWrap>
        <Button type="button" onClick={handlePrevStep}>
          이전
        </Button>
        <Button type="button" onClick={handleWithoutCatSubmit}>
          스킵
        </Button>
        <Button type="button" onClick={handleWithCatSubmit}>
          확인
        </Button>
      </ButtonWrap>
    </>
  );
});
CatInfoPage.propTypes = {
  setStep: propTypes.func.isRequired,
};

export default CatInfoPage;
// 나이 이름 성별 이미지
