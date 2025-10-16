import React, {FC, } from 'react';
import logo from './logo.svg';
import './App.css';

const URL : string = "https://api.aladhan.com/v1/timingsByAddress/16-10-2025?address=Guildford%2C+UK&method=3&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&timezonestring=UTC&calendarMethod=UAQ";

const App : FC = () => {
  return (
    <React.Fragment>
      <h1>React Prayer Times</h1>
    </React.Fragment>
  )
}

export default App;
