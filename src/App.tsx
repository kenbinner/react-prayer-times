import React, {FC, useState, useEffect} from 'react';
import './App.css';

const URL : string = "https://api.aladhan.com/v1/timingsByAddress/16-10-2025?address=Guildford%2C+UK&method=3&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&timezonestring=UTC&calendarMethod=UAQ";

const App : FC = () => {

  const [fajr, setFajr] = useState('00:00');
  const [dhuhr, setDhuhr] = useState('00:00');
  const [asr, setAsr] = useState('00:00');
  const [maghrib, setMaghrib] = useState('00:00');
  const [isha, setIsha] = useState('00:00');
  const [sunrise, setSunrise] = useState('00:00');
  const [sunset, setSunset] = useState('00:00');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL)
      result.json().then(json => {
        console.log(json);
        setFajr(json.data.timings.Fajr);
        setDhuhr(json.data.timings.Dhuhr);
        setAsr(json.data.timings.Asr);
        setMaghrib(json.data.timings.Maghrib);
        setIsha(json.data.timings.Isha);
        setSunrise(json.data.timings.Sunrise);
        setSunset(json.data.timings.Sunset);
      })
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <h1>React Prayer Times</h1>
      Date: 16/01/2025 
      <ul>
        <li>Fajr: {fajr}</li>
        <li>Dhuhr: {dhuhr}</li>
        <li>Asr: {asr}</li>
        <li>Maghrib: {maghrib}</li>
        <li>Isha: {isha}</li>
      </ul>

      <ul>
        <li>Sunrise: {sunrise}</li>
        <li>Sunset: {sunset}</li>
      </ul>
      
    </React.Fragment>
  )
}

export default App;
