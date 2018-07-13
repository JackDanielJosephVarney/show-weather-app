import './styles.scss';
import { getWeatherDataByCity, getWeatherDataByCoords } from './getWeatherData';
import { writeWeatherData, hideSpinner, showSpinner } from './writeWeatherData';
import { getElement } from './utils';

(async () => {
    const data = await getWeatherDataByCity();
    hideSpinner();
    writeWeatherData(data);
})()

const searchButtonClickEvent = async () => {
    const cityName = getElement('#search-input').value;
    const data = await getWeatherDataByCity(cityName);
    writeWeatherData(data);
};

getElement('#search-button').addEventListener('click', searchButtonClickEvent);