import React, { FC, useState, useEffect } from 'react';
import './App.css';
import { format } from 'date-fns';

//Prayer time API
const prayerBaseURL: string = "https://api.aladhan.com/v1/timings/";
const prayerURLendpoint: string = "&method=99&methodSettings=18%7Cnull%7C17&tune=15%2C19%2C-3%2C3%2C-3%2C0%2C0%2C-6%2C0&timezonestring=Europe/London&latitudeAdjustmentMethod=1";

//Geocode API
// https://api.opencagedata.com/geocode/v1/json?q=52.5432379%2C+13.4142133&key=bf950e9d1cd94fd2a239389d4c2ce056
const geocodeBaseURL: string = "https://api.opencagedata.com/geocode/v1/json?q=";
const geocodeURLendpoint: string = "&key=bf950e9d1cd94fd2a239389d4c2ce056";

const App: FC = () => {

  const [date, setDate] = useState('loading');
  const [coords, setCoords] = useState<[number, number]>([51.232768, -0.57344]);
  const [town, setTown] = useState('loading');
  const [country, setCountry] = useState('loading');

  //Format Date
  useEffect(() => {
    const today = format(new Date(), 'dd-MM-yyyy');
    setDate(today);
  }, [])

  //Fetch user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords([
          position.coords.latitude,
          position.coords.longitude
        ]);
        console.log("lat: " + position.coords.latitude + " long: " + position.coords.longitude);
      },
      (error) => {
        console.error("Location error:", error);
      }
    )
  }, [])

  const [fajr, setFajr] = useState('00:00');
  const [dhuhr, setDhuhr] = useState('00:00');
  const [asr, setAsr] = useState('00:00');
  const [maghrib, setMaghrib] = useState('00:00');
  const [isha, setIsha] = useState('00:00');
  const [sunrise, setSunrise] = useState('00:00');
  const [sunset, setSunset] = useState('00:00');

  //fetch Prayer Time data from URL
  useEffect(() => {
    if (date !== 'DD-MM-YYYY') {
      //Constructing URL
      let URL: string = prayerBaseURL + date + "?latitude=" + coords[0] + "&longitude=" + coords[1] + prayerURLendpoint;

      //Executing request
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
    }
  }, [date, coords]);

  //fetch Location from Geocode URL
  useEffect(() => {
    if (coords[0] !== 0 && coords[1] !== 0) {
      //Constructing URL
      let URL: string = geocodeBaseURL + coords[0] + "%2C+" + coords[1] + geocodeURLendpoint;

      //Executing request
      const fetchData = async () => {
        const result = await fetch(URL)
        result.json().then(json => {
          console.log(json);
          setTown(json.results[0].components.town);
          setCountry(json.results[0].components.country);
        })
      }
      fetchData();
    }
  }, [coords]);

  return (
    <React.Fragment>
      <h1 style={{ color: 'darkgreen' }}>React Prayer Times</h1>
      Date: {date}, {town}, {country}
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
