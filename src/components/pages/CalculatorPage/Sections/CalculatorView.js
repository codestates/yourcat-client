import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import catImage from '../../../../images/calculatorCat.jpg';

const CAT = styled('img')`
  width: 80%;
  border-radius: 5%;
`;

CAT.defaultProps = {
  src: catImage,
};

const BIGBOX = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FORM = styled('form')`
  margin: 10px 40px;
  padding: 50px 10px;
  width: 35%;
  height: 600px;
  background-color: #fcf9ea;
  border-radius: 10px;
`;

const DIV = styled('div')`
  margin: 20px 10px;
  background-color: white;
  border-radius: 10px;
  padding: 10px 30px;
`;

const GUIDE = styled('div')`
  margin: 20px 10px;
  color: #badfdb;
  margin-bottom: 30px;
`;

const INPUTDIV = styled('div')`
  height: 50px;
  margin: 20px 10px;
`;

const OUTPUT = styled('div')`
  margin: 20px 10px;
  color: #f8a978;
  font-size: 25px;
`;

const OUTPUTDIV = styled('div')`
  margin: 30px 10px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  border-radius: 10px;
`;

const IMGDIV = styled('div')`
  margin: 30px 0;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
`;

const BTNBOX = styled('div')`
  height: 50px;
  margin: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const BUTTON = styled('button')`
  width: 130px;
  height: 45px;
  background-color: #f8a978;
  color: white;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  border: none;
`;

const INPUT = styled.input`
  all: unset;
  padding: 3px;
  background: rgba(0, 0, 0, 0.003);
  font-weight: 300;
  font-size: 15px;
  &:hover {
    border: 1.5px solid #badfdb;
  }
`;

const SELECT = styled.select`  
  padding: 3px;
  border: 1px solid;  
  border: 1.5px solid rgba(0, 0, 0, 0.15);
  border-radius: 7px;
  font-weight: 200;
  font-size: 15px;
  &:hover {
    border: 1.5px solid #badfdb;
`;

export default function InputSection() {
  const [weight, setWeight] = useState('');
  const [calorie, setCalorie] = useState('');
  const [RER, setRER] = useState(1);
  const [MER, setMER] = useState(1);
  const [spoon, setSpoon] = useState('');
  const catCriteria = useRef();
  const [criteria, setCriteria] = useState('');

  const optionHandler = event => {
    setCriteria(event.currentTarget.value);
  };

  const onWeightHandler = event => {
    setWeight(event.currentTarget.value);
  };

  const onCalorieHandler = event => {
    setCalorie(event.currentTarget.value);
  };

  const onRERHandler = num => {
    if (num < 2) {
      setRER(70 * num);
    } else {
      setRER(30 * num + 70);
    }
  };

  const onMERHandler = rer => {
    switch (catCriteria.current.value) {
      case 'babycat':
        setMER(3 * rer);
        break;
      case '4kitten':
        setMER(2.5 * rer);
        break;
      case '7kitten':
        setMER(2 * rer);
        break;
      case 'intactAdult':
        setMER(1.4 * rer);
        break;
      case 'neuteredAdult':
        setMER(1.2 * rer);
        break;
      case 'activeAdult':
        setMER(1.6 * rer);
        break;
      case 'inactiveAdult':
        setMER(0.8 * rer);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    onRERHandler(weight);
    onMERHandler(RER);
  });

  // 버튼을 누르면 그 값으로 계산해서 아웃풋으로 전달
  const onSubmitHandler = event => {
    event.preventDefault();
    // 한 스푼당 11.5g 기준
    setSpoon(Math.round(((MER / calorie) * 1000) / 11.5));
  };

  const onResetHandler = () => {
    setCalorie('');
    setWeight('');
    setRER('');
    setMER('');
    setSpoon('');
  };

  return (
    <BIGBOX>
      <FORM onSubmit={onSubmitHandler}>
        <DIV>
          <GUIDE>Please enter your cats information.</GUIDE>
          <INPUTDIV>
            <INPUT
              type="text"
              value={weight}
              placeholder="weight"
              onChange={onWeightHandler}
            />
            kg
          </INPUTDIV>
          <INPUTDIV>
            <SELECT onChange={optionHandler} value={criteria} ref={catCriteria}>
              <option value="default">--choose option--</option>
              <option value="babycat">0 to 3 months </option>
              <option value="4kitten">4 months to 6 months</option>
              <option value="7kitten">7 months to Adult</option>
              <option value="intactAdult">Intact adult</option>
              <option value="neuteredAdult">Neutered adult</option>
              <option value="activeAdult">Active adult</option>
              <option value="inactiveAdult">Inactive adult</option>
            </SELECT>
          </INPUTDIV>
        </DIV>

        <DIV>
          <GUIDE>Please enter cat feed information.</GUIDE>
          <INPUTDIV>
            <INPUT
              type="text"
              value={calorie}
              placeholder="calorie"
              onChange={onCalorieHandler}
            />
            kcal/kg
          </INPUTDIV>
        </DIV>
        <BTNBOX>
          <BUTTON type="button" onClick={onResetHandler}>
            Reset
          </BUTTON>

          <BUTTON type="submit">Calculate</BUTTON>
        </BTNBOX>
      </FORM>
      <FORM>
        <IMGDIV>
          <CAT alt="고양이사진" />
        </IMGDIV>

        {spoon && (
          <OUTPUTDIV>
            <OUTPUT>Give your cat {spoon} spoons per day</OUTPUT>
          </OUTPUTDIV>
        )}
      </FORM>
    </BIGBOX>
  );
}
