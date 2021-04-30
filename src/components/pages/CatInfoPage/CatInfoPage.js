import React, { useState } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import FileUploader from '../../../utils/ImageUploader';
import signUpRequest from '../../../_actions/signUpRequest';

const Div = styled.div`
  display: inline-block;
  margin: 0;
`;
const Section = styled.section`
  display: flex;
`;
const Input = styled.input`
  all: unset;
  border: 1px solid black;
  margin-bottom: 20px;
  width: 50px;
  height: 20px;
  border-radius: 2px;
`;
//------------------------
// 버튼 비활성화 CSS 추가 가능
//------------------------

const CatInfoPage = React.memo(props => {
  const dispatch = useDispatch();
  const { file, userData } = useSelector(state => {
    return state.photoFileReducer || {};
  });
  const [data, setData] = useState({
    age: '',
    name: '',
    gender: 'male',
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
    dispatch(signUpRequest(reqData));
  };
  const handleWithoutCatSubmit = () => {
    const { age, name } = data;
    if (!age && !name && !file) {
      // 전부다 없는 경우
      handleRequest({ file, userData });
    } else {
      // TODO :  -- import 해와서 모달창 팝업
      console.log('전부 요청해야 됨');
    }
  };
  const handleWithCatSubmit = () => {
    const { age, name } = data;
    if (age && name && file) {
      // 모든 파일이 존재하는 경우
      handleRequest({
        file,
        userData: {
          ...userData,
          catInfo: { ...data, gender: checkGender.male ? 'male' : 'female' },
        },
      });
    } else {
      // TODO :  -- import 해와서 모달창 팝업
      console.log('전부 요청해야됨');
    }
  };
  return (
    <>
      <Section>
        <form onSubmit={event => event.preventDefault()}>
          <FileUploader width={150} height={150} border="5px" />
          <Div>
            <div>
              age
              <Input
                name="age"
                type="number"
                min="0"
                onChange={handleChange('age')}
              />
            </div>
            <div>
              name
              <Input name="name" onChange={handleChange('name')} />
            </div>
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
      <div>
        <button type="button" onClick={handlePrevStep}>
          이전
        </button>
        <button type="button" onClick={handleWithoutCatSubmit}>
          스킵
        </button>
        <button type="button" onClick={handleWithCatSubmit}>
          확인
        </button>
      </div>
    </>
  );
});
CatInfoPage.propTypes = {
  setStep: propTypes.func.isRequired,
};

export default CatInfoPage;
// 나이 이름 성별 이미지
