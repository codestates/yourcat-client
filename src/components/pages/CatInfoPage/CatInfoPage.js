import React, { useState } from 'react';
import styled from 'styled-components';
import FileUploader from '../../../utils/ImageUploader';

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

function CatInfoPage() {
  const [data, setData] = useState({
    age: '',
    name: '',
    gender: '',
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
  return (
    <Section>
      <FileUploader width={150} height={150} border="5px" />
      <form>
        <Div>
          <div>
            age
            <Input onKeyDown={handleChange('age')} />
          </div>
          <div>
            name
            <Input onChange={handleChange('name')} />
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
  );
}

export default CatInfoPage;
// 나이 이름 성별 이미지
