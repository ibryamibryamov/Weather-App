import { useState, useEffect } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import WeatherDisplay from './components/WeatherDisplay';
import axios from 'axios';
import clearImage from './assets/weather-conditions-images/clear.jpg';
import drizzleImage from './assets/weather-conditions-images/drizzle.jpg';
import fewCloudsImage from './assets/weather-conditions-images/few-clouds.jpg';
import heavyRainImage from './assets/weather-conditions-images/heavy-rain.jpg';
import heavySnowImage from './assets/weather-conditions-images/heavy-snow.jpg';
import lightSnowImage from './assets/weather-conditions-images/light-snow.jpg';
import overcastCloudsImage from './assets/weather-conditions-images/overcast-clouds.jpg';
import thunderstormWithRainImage from './assets/weather-conditions-images/thunderstorm-with-rain.jpg';
import appLogo from './assets/logo.png';



function App() {

const apiKey = ''; // UNIQUE API KEY

const [userInput, setUserInput] = useState('');
const [lat, setLat] = useState(42.698334);
const [lon, setLon] = useState(23.319941);
const [backgroundImage, setBackgroundImage] = useState(overcastCloudsImage);



const handleSearchbar = (target) => {
  setUserInput(target);
}

const handleBackground = (weather) => {
  if( weather === 'thunderstorm with light rain' || weather === 'thunderstorm with rain' || weather === 'thunderstorm with heavy rain' || weather === 'light thunderstorm' || weather === 'thunderstorm' || weather === 'heavy thunderstorm' || weather === 'ragged thunderstorm' || weather === '	thunderstorm with light drizzle' || weather === 'thunderstorm with drizzle' || weather === 'thunderstorm with heavy drizzle') {
      setBackgroundImage(thunderstormWithRainImage);
    } else if ( weather === 'light intensity drizzle' || weather === 'drizzle' || weather === 'heavy intensity drizzle' || weather === 'light intensity drizzle rain' || weather === 'drizzle rain' || weather === 'heavy intensity drizzle rain' || weather === 'shower rain and drizzle' || weather === 'heavy shower rain and drizzle' || weather === 'shower drizzle' || weather === 'light rain' || weather === 'moderate rain'){
      setBackgroundImage(drizzleImage);
    } else if ( weather === 'heavy intensity rain' || weather === 'very heavy rain' || weather === 'extreme rain' || weather === 'light intensity shower rain' || weather === 'shower rain' || weather === 'heavy intensity shower rain' || weather === 'ragged shower rain'){
      setBackgroundImage(heavyRainImage);
    } else if ( weather === 'light snow' || weather === 'snow' || weather === 'sleet' || weather === 'light shower sleet' || weather === 'shower sleet' || weather === 'light rain and snow' || weather === 'rain and snow' || weather === 'light shower snow'){
      setBackgroundImage(lightSnowImage);
    } else if ( weather === 'heavy snow' || weather === 'shower snow' || weather === 'heavy shower snow'){
      setBackgroundImage(heavySnowImage);
    } else if ( weather ==='clear sky'){
      setBackgroundImage(clearImage);
    } else if ( weather ==='few clouds' || weather ==='scattered clouds' || weather ==='broken clouds' || weather ==='overcast clouds'){
      setBackgroundImage(fewCloudsImage);
    } else {
      setBackgroundImage(clearImage);
    }
}


useEffect(()=>{
const fetchData = async () => {
  try{
  const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=URI-ENCODED-${userInput}&key=${apiKey}`);
  setLat(response.data.results[0].geometry.lat);
  setLon(response.data.results[0].geometry.lng);
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}

fetchData();

},[userInput])


  return (
    <div className="App" style={{backgroundImage: `url(${backgroundImage})`}} >
      <h1 className='App__title'>WEATHER APP</h1>
      <img className='App__logo' src={appLogo}/>
      <Searchbar handleSearchbar={handleSearchbar}/>
      <WeatherDisplay lat={lat} lon={lon} handleBackground={handleBackground}/>
    </div>
  );
}

export default App;
