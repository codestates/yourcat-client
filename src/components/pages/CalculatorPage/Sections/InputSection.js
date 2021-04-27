import React, { useState } from 'react';

export default function InputSection() {
  const [age, setAge] = useState('');

  const onAgeHandler = event => {
    setAge(event.currentTarget.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    // eslint-disable-next-line
    console.log(age);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>Please enter your cats information.</div>

        <input type="text" value={age} onChange={onAgeHandler} />

        <button type="submit">Calculate</button>
      </form>
    </div>
  );
}
