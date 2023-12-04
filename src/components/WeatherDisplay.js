import { useEffect, useState } from "react";
import axios from "axios";
import clearIcon from '../assets/weather-conditions-icons/static/day.svg';
import drizzleIcon from '../assets/weather-conditions-icons/static/rainy-4.svg';
import fewCloudsIcon from '../assets/weather-conditions-icons/static/cloudy-day-2.svg';
import snowyIcon from '../assets/weather-conditions-icons/static/snowy-4.svg';
import thunderstormIcon from '../assets/weather-conditions-icons/static/thunder.svg';
import heavyRainIcon from '../assets/weather-conditions-icons/static/rainy-7.svg';
import heavySnowIcon from '../assets/weather-conditions-icons/static/snowy-6.svg';

const WeatherDisplay = (props) => {
const [weatherData, setWeatherData] = useState(null);
const [weatherIcon, setWeatherIcon] = useState('');

const apiKey = ''; // UNIQUE API KEY

const formatTemperature = (temp) => {
const celsiusValue = Math.round(temp -273.15);
return celsiusValue;
}

const determineWeatherIcon = (weather) => {
  if( weather === 'thunderstorm with light rain' || weather === 'thunderstorm with rain' || weather === 'thunderstorm with heavy rain' || weather === 'light thunderstorm' || weather === 'thunderstorm' || weather === 'heavy thunderstorm' || weather === 'ragged thunderstorm' || weather === '	thunderstorm with light drizzle' || weather === 'thunderstorm with drizzle' || weather === 'thunderstorm with heavy drizzle') {
  setWeatherIcon(thunderstormIcon);
  } else if ( weather === 'light intensity drizzle' || weather === 'drizzle' || weather === 'heavy intensity drizzle' || weather === 'light intensity drizzle rain' || weather === 'drizzle rain' || weather === 'heavy intensity drizzle rain' || weather === 'shower rain and drizzle' || weather === 'heavy shower rain and drizzle' || weather === 'shower drizzle' || weather === 'light rain' || weather === 'moderate rain'){
  setWeatherIcon(drizzleIcon);
  } else if ( weather === 'heavy intensity rain' || weather === 'very heavy rain' || weather === 'extreme rain' || weather === 'light intensity shower rain' || weather === 'shower rain' || weather === 'heavy intensity shower rain' || weather === 'ragged shower rain'){
  setWeatherIcon(heavyRainIcon);
  } else if ( weather === 'light snow' || weather === 'snow' || weather === 'sleet' || weather === 'light shower sleet' || weather === 'shower sleet' || weather === 'light rain and snow' || weather === 'rain and snow' || weather === 'light shower snow'){
  setWeatherIcon(snowyIcon);
  } else if ( weather === 'heavy snow' || weather === 'shower snow' || weather === 'heavy shower snow'){
    setWeatherIcon(heavySnowIcon);
  } else if ( weather ==='clear sky'){
    setWeatherIcon(clearIcon);
  } else if ( weather ==='few clouds' || weather ==='scattered clouds' || weather ==='broken clouds' || weather ==='overcast clouds'){
    setWeatherIcon(fewCloudsIcon);
  } else {
    setWeatherIcon('');
  }
}





useEffect(()=>{
const fetchData = async () => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=${apiKey}`);
        setWeatherData(response.data);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

fetchData();
},[apiKey, props.lat, props.lon])

useEffect(()=>{
if(weatherData !== null){
  determineWeatherIcon(weatherData.weather?.[0]?.description);
  props.handleBackground(weatherData.weather?.[0]?.description);
}
},[weatherData])


  return (
    <div className="weather-display">
    <div className="weather-display__data-container glassmorphic">
    <div className="weather-display__data-container__upper">
      <h1 className="weather-display__data-container__upper__temp">{weatherData !== null ? formatTemperature(weatherData.main.temp) : ''} °C</h1>
      <img className="weather-display__data-container__upper__icon" src={weatherIcon}/>
    </div>
    <div className="weather-display__data-container__middle">
      <h3 className="weather-display__data-container__middle__city">{weatherData !== null ? weatherData.name + ', ' + weatherData.sys.country : ''}</h3>
    </div>
    <div className="weather-display__data-container__bottom">
    {weatherData !== null ? weatherData.weather?.[0]?.description.toUpperCase() : ''}
    </div>
    </div>
    <div className="weather-display__additional-data glassmorphic">
    <h1 className="weather-display__aditional-data__title">Weather Data</h1>
    <div className="weather-display__additional-data__upper">
      <h3 className="weather-display__aditional-data__upper__container">Feels like:{weatherData !== null ? formatTemperature(weatherData.main.feels_like) : ''}</h3>
      <h3 className="weather-display__aditional-data__upper__container">Temperature Max: {weatherData !== null ? formatTemperature(weatherData.main.temp_max) : ''}</h3>
      <h3 className="weather-display__aditional-data__upper__container">Temperature Min: {weatherData !== null ? formatTemperature(weatherData.main.temp_min) : ''}</h3>
    </div>
    <div className="weather-display__additional-data__middle">
    <h3 className="weather-display__aditional-data__middle__container">Humidity: {weatherData !== null ? weatherData.main.humidity + '%' : ''}</h3>
    <h3 className="weather-display__aditional-data__middle__container">Visibility: {weatherData !== null ? weatherData.visibility/1000 : '?'} Meters</h3>
    </div>
    <div className="weather-display__additional-data__bottom">
    <h3 className="weather-display__aditional-data__bottom__container">Wind speed: {weatherData !== null ? Math.round(weatherData.wind.speed * 3.6) : '?'} KM/h</h3>
    <h3 className="weather-display__aditional-data__bottom__container">Latitude:{props.lat}</h3>
    <h3 className="weather-display__aditional-data__bottom__container">Longitude:{props.lon}</h3>
    </div>
    </div>
    </div>
  )
}

export default WeatherDisplay