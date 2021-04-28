import React, { useState, useRef, useEffect } from 'react';

export default function InputSection() {
  const [weight, setWeight] = useState('');
  const [calorie, setCalorie] = useState('');
  const [RER, setRER] = useState(1);
  const [MER, setMER] = useState(1);
  const [result, setResult] = useState('');
  const [spoon, setSpoon] = useState('');
  const catCriteria = useRef();

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
      case 'inactiveAdult':
        setMER(0.8 * rer);
        break;
      case 'activeAdult':
        setMER(1.6 * rer);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    onRERHandler(weight);
    onMERHandler(RER);
    setResult((MER / calorie) * 1000);
  });

  // 버튼을 누르면 그 값으로 계산해서 아웃풋으로 전달
  const onSubmitHandler = event => {
    event.preventDefault();

    // 한 스푼당 11.5g 기준
    setSpoon(Math.round(result / 11.5));

    console.log(catCriteria.current.value);
    console.log('weight: ', weight);
    console.log('RER: ', RER);
    console.log('MER: ', MER);
    console.log('result: 하루에 ', Math.round(result), 'g');
    console.log('하루에 ', result / 11.5, '스푼');

    // setCalorie('');
    // setWeight('');
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>Please enter your cats information.</div>

        <input
          type="text"
          value={weight}
          placeholder="weight"
          onChange={onWeightHandler}
        />
        <select ref={catCriteria}>
          <option value="babycat">0 to 3 months </option>
          <option value="4kitten">4 months to 6 months</option>
          <option value="7kitten">7 months to Adult</option>
          <option value="intactAdult">Intact adult</option>
          <option value="neuteredAdult">Neutered adult</option>
          <option value="inactiveAdult">Inactive adult</option>
          <option value="activeAdult">Active adult</option>
        </select>
        <div>Please enter cat feed information.</div>
        <div>
          <input
            type="text"
            value={calorie}
            placeholder="calorie"
            onChange={onCalorieHandler}
          />
          kcal/kg
        </div>

        <button type="submit">Calculate</button>
      </form>
      <div>급여량 계산 결과: {spoon} 스푼</div>
    </div>
  );
}
