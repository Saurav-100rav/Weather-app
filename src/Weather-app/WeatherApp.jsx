import React, { useEffect, useState } from 'react'
import "./weatherApp.css"
import axios from "axios"

import clear_icon from "../assets/clear.png";
import search_icon from "../assets/search.png";
import rain_icon from "../assets/rain.png";
import drizzle_icon from "../assets/drizzle.png";
import snow_icon from "../assets/snow.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import cloud_icon from "../assets/cloud.png";

const WeatherApp = () => {
  const token = process.env.REACT_APP_WEATHER_API_TOKEN;
  const [city,setCity] = useState("")
  const [apiData,setApiData]=useState({});

  const [weatherIcon,setWeatherIcon]=useState('');
  useEffect(()=>{
      alert("Pleae Enter a city name like london,paris,patna,jaipur etc to see current weather status..")
  },[])

  const SearchHandler=async()=>{
    if(city===""){
      alert("Please Enter a city name...");
      return;
    }
      
    try {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${token}`);
      console.log(data);
      setApiData(data);
      setCity("");

      if(apiData.weather[0].icon==="01d" || apiData.weather[0].icon==="01n") setWeatherIcon(clear_icon);
      if(apiData.weather[0].icon==="02d" || apiData.weather[0].icon==="02n") setWeatherIcon(cloud_icon);
      if(apiData.weather[0].icon==="03d" || apiData.weather[0].icon==="03n") setWeatherIcon(cloud_icon);
      if(apiData.weather[0].icon==="04d" || apiData.weather[0].icon==="04n") setWeatherIcon(drizzle_icon);
      if(apiData.weather[0].icon==="09d" || apiData.weather[0].icon==="09n") setWeatherIcon(rain_icon);
      if(apiData.weather[0].icon==="10d" || apiData.weather[0].icon==="10n") setWeatherIcon(rain_icon);
      if(apiData.weather[0].icon==="13d" || apiData.weather[0].icon==="13n") setWeatherIcon(snow_icon);

      if(weatherIcon==="") setWeatherIcon(clear_icon);
      else console.log(`hii...${weatherIcon}`)
    } catch (error) {
      setCity("");
      console.log("Error while fetching city..",error);
      alert("We are sorry, Weather forecast of requesting city not found");
    }
    
  }
  return (
    <div className='container'>
         <div className="search-bar flex-row">
              <input type="text" onChange={(e)=>setCity(e.target.value)} value={city} required={true}/>
              <img src={search_icon} alt="search-icon" id='search-icon' onClick={SearchHandler}/>
         </div>
         <div className="weather-icon">
            <img src={weatherIcon} alt="weather-icon" className='cloud' />
         </div>
         <div className="weather-temperature flex-column">
                <span className='city'>{ apiData!==""?apiData.name:""}</span>
                <span className='temperature'>{apiData?.main?`${apiData.main.temp}°c`:""}</span>
                <div className='min-max'>
                         <span>{apiData?.weather?`${apiData.weather[0].main}`:""}</span> 
                         <span>{apiData?.main?`${apiData.main.temp_min}`:""}  {"/ "}
                          {apiData?.main?`${apiData.main.temp_max}`:""}</span>
                </div>
                
         </div>
         <div className="weather-details flex-row">
              <div className="humidity flex-row">
                {apiData?.main? <img src={humidity_icon} alt="humidity" id='humidity'/> : "" }
                <div className="humidity-data flex-column">
                  <span>{apiData?.main?`${apiData.main.humidity}%`:""}</span>
                  {apiData?.main? <span>Humidity</span> : "" }
                </div>
              </div>

              <div className="wind flex-row">
                {apiData?.wind? <img src={wind_icon} alt="wind" /> : "" }
                  <div className="wind-data flex-column">
                    <span>{apiData?.wind?`${apiData.wind.speed} km/hr`:""}</span>
                    {apiData?.wind? <span>Wind Speed</span> : "" }
                  </div>
              </div>
         </div>
    </div>
  )
}

export default WeatherApp