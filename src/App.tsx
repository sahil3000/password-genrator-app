import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import usePasswordGenerator from './hooks/use-password-generator';
import { checkboxProps } from './types';

const passwordRatingHandler = (password: string) => {
  // 4 weak, 8- good, 12 - Medium, 16 - Excellent, 20 - great
  const length: number = password.length;
  if (length === 0) {
    return "";
  } else if (length < 8) {
    return "Weak";
  }else if (length < 12) {
    return "Good";
  } else if (length < 16) {
    return "Medium";
  } else if (length < 20) {
    return "Excellent";
  } else if (length === 20) {
    return "Great";
  } 
}
const checkboxList = [
  { text: 'Include Uppercase Letter', state: false },
  { text: 'Include Lowercase Letter', state: false },
  { text: 'Include Numbers', state: false },
  { text: 'Include Symbols', state: false },
]

function App() {
  const [characterRange, setCharacterRange] = useState<number>(4);
  const [checkboxs, setCheckboxs] = useState(checkboxList);
  const {password, errorMessage, generatePassword} = usePasswordGenerator();
  const checkboxChangeHandler = (index: number) => {
    const allEle = [...checkboxs];
    const ele = allEle[index];
    ele.state = !ele.state;
    setCheckboxs(allEle);
  }

  return (
    <div className="container">
      <h1>Password Generator App</h1>
      <div className='inner-container'>
        <div className="flex-box">
          <span className='text-white'>{password}</span>
          <Button
            text='Copy'
            classNames='button'
            onClick={() => { }}
          />
        </div>
        {errorMessage && <div className="flex-box">
          <span className='text-red'>{errorMessage}</span>
        </div>}
        <div className="flex-box">
          <span className='text-white'>Character Length</span>
          <span className='text-white'>{characterRange}</span>
        </div>

        <div className="input-range-box">
          <input
            type='range'
            min={4}
            max={20}
            value={characterRange}
            onChange={(e) => setCharacterRange(Number(e.target.value))}
            className='input-range'
          />
        </div>

        <div className="checkbox-grid">
          {checkboxs.map((ele: checkboxProps, index: number) => (
            <div key={ele.text}>
              <input
                type='checkbox'
                checked={ele.state}
                onChange={() => checkboxChangeHandler(index)}
              />{ele.text}
            </div>
          ))}

        </div>

        <div className="flex-box">
          <span className='text-white'>Strength</span>
          <span className='text-white'>{passwordRatingHandler(password)}</span>
        </div>

        <div className='gnerate-btn'>
          <Button
            text='Generator Password'
            classNames='button buttom-lg'
            onClick={() => {
              generatePassword(checkboxs, characterRange)
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
