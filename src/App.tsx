import React, {FC, useState, useEffect} from 'react';
import './App.css';
import { format } from 'date-fns';

const baseURL : string = "https://api.aladhan.com/v1/timingsByAddress/";
const URLendpoint : string = "?address=Guildford%2C+UK&method=3&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&timezonestring=UTC&calendarMethod=UAQ";

const App : FC = () => {

  let coords : number[] = [0,0];
  let location : string  = '';
  const [date, setDate] = useState('DD-MM-YYYY');
  
  //Format Date
  useEffect(() => {
    const today = format(new Date(), 'dd-MM-yyyy');
    setDate(today);
  })

  //Constructing URL
  let URL : string = baseURL + date + URLendpoint;

  const [fajr, setFajr] = useState('00:00');
  const [dhuhr, setDhuhr] = useState('00:00');
  const [asr, setAsr] = useState('00:00');
  const [maghrib, setMaghrib] = useState('00:00');
  const [isha, setIsha] = useState('00:00');
  const [sunrise, setSunrise] = useState('00:00');
  const [sunset, setSunset] = useState('00:00');

  //fetch Prayer Time data from URL
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

  //Fetch user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords = [
          position.coords.latitude,
          position.coords.longitude
        ];
        console.log(coords);
      },
      (error) => {
        console.error("Location error:", error);
        //default to Guildford
        coords = [
          51.24436312957442, 
          -0.5678265590129494
        ]
        console.log("error getting coords");
      }
    )
  }, [])

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
