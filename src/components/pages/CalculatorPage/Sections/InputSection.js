import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import calculator from '../../../../_actions/calculator';

export default function InputSection() {
  const dispatch = useDispatch();
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('');

  const onAgeHandler = event => {
    setAge(event.currentTarget.value);
  };

  const onWeightHandler = event => {
    setWeight(event.currentTarget.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    // 버튼을 누르면 그 값으로 계산해서 아웃풋으로 전달
    // dispatch
    dispatch(calculator(age));

    setResult(age * weight);
    setAge('');
    setWeight('');
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>Please enter your cats information.</div>

        <input
          type="text"
          value={age}
          placeholder="age"
          onChange={onAgeHandler}
        />
        <input
          type="text"
          value={weight}
          placeholder="weight"
          onChange={onWeightHandler}
        />

        <button type="submit">Calculate</button>
      </form>
      <div>급여량 계산 결과: {result}</div>
    </div>
  );
}
