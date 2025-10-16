import React, {FC, useState, useEffect} from 'react';
import './App.css';

const URL : string = "https://api.aladhan.com/v1/timingsByAddress/16-10-2025?address=Guildford%2C+UK&method=3&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&timezonestring=UTC&calendarMethod=UAQ";

const App : FC = () => {

  const [fajr, setFajr] = useState('00:00');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL)
      result.json().then(json => {
        console.log(json);
        setFajr(json.data.timings.Fajr);
      })
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <h1>React Prayer Times</h1>
      Fajr: {fajr}
    </React.Fragment>
  )
}

export default App;
