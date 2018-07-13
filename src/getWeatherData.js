import { isoCountries } from './countryISOCodes';

const url = `https://api.openweathermap.org/data/2.5/weather?APPID=${process.env.APIKEY}`;

const convertResponse = res =>
  res.cod === '404'
    ? null
    : {
        id: res.weather[0].id,
        cityName: res.name,
        country: isoCountries[res.sys.country],
        description: res.weather[0].description,
        temperature: res.main.temp - 273,
        cloudCoverage: res.clouds.all,
        humidity: res.main.humidity
      };

const getWeatherDataByCity = async (cityName = 'Sydney') => {
  const response = await fetch(`${url}&q=${cityName}`);
  const weatherData = await response.json();
  return convertResponse(weatherData);
};

const getWeatherDataByCoords = async coords => {
  const response = await fetch(`${url}&lat=${coords.latitude}&lon=${coords.longitude}`);
  const weatherData = await response.json();
  return convertResponse(weatherData);
};

export { getWeatherDataByCity, getWeatherDataByCoords };
