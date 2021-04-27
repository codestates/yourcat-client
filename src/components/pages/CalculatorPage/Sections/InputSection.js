import React, { useState, useRef } from 'react';

export default function InputSection() {
  const [weight, setWeight] = useState('');
  const [calorie, setCalorie] = useState('');
  const [feedWeight, setFeedWeight] = useState('');
  const [result, setResult] = useState('');
  const catCriteria = useRef();

  const onWeightHandler = event => {
    setWeight(event.currentTarget.value);
  };

  const onCalorieHandler = event => {
    setCalorie(event.currentTarget.value);
  };

  const onFeedWeightHandler = event => {
    setFeedWeight(event.currentTarget.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    // 버튼을 누르면 그 값으로 계산해서 아웃풋으로 전달

    setResult(calorie * weight);
    setCalorie('');
    setWeight('');
    console.log(catCriteria.current.value);
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
          <option value="babycat">0 to 4 months </option>
          <option value="kitten">4 months to Adult</option>
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
          kcal per
          <input
            type="text"
            value={feedWeight}
            placeholder="feedWeight"
            onChange={onFeedWeightHandler}
          />
          g
        </div>

        <button type="submit">Calculate</button>
      </form>
      <div>급여량 계산 결과: {result}</div>
    </div>
  );
}
