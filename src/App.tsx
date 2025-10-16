import React, {FC, useState, useEffect} from 'react';
import './App.css';
import { format } from 'date-fns';

const baseURL : string = "https://api.aladhan.com/v1/timingsByAddress/";
const URLendpoint : string = "?address=Guildford%2C+UK&method=3&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&timezonestring=UTC&calendarMethod=UAQ";

const App : FC = () => {

  const [date, setDate] = useState('DD-MM-YYYY');
  
  useEffect(() => {
    const today = format(new Date(), 'dd-MM-yyyy');
    setDate(today);
  })

  let URL : string = baseURL + date + URLendpoint;

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
      <h1 style={{color: 'darkgreen'}}>React Prayer Times</h1>
      Date: {date}, Guildford, UK
      <ul>
        <li><b>Fajr:</b> {fajr}</li>
        <li><b>Dhuhr:</b> {dhuhr}</li>
        <li><b>Asr:</b> {asr}</li>
        <li><b>Maghrib:</b> {maghrib}</li>
        <li><b>Isha:</b> {isha}</li>
      </ul>

      <ul>
        <li className='sun'><b>Sunrise:</b> {sunrise}</li>
        <li className='sun'><b>Sunset:</b> {sunset}</li>
      </ul>
      
    </React.Fragment>
  )
}

export default App;
