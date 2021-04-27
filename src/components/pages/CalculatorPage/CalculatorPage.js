import React from 'react';
import Calculator from './Sections/Calculator';
import InputSection from './Sections/InputSection';
import OutputSection from './Sections/OutputSection';
import Header from './Sections/Header';

export default function CalculatorPage() {
  return (
    <div>
      <Header />
      <InputSection />
      <OutputSection />
      <Calculator />
    </div>
  );
}
