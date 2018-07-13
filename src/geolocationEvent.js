import { getWeatherDataByCity, getWeatherDataByCoords } from './getWeatherData';
import { writeWeatherData, hideSpinner, showSpinner } from './writeWeatherData';
import { getElement } from './utils';


const onGeolocationSuccess = async position => {
    const data = await getWeatherDataByCoords(position.coords);
    writeWeatherData(data);

    hideSpinner();
};

const onGeolocationFailure = async () => {
    const data = await getWeatherDataByCity();
    writeWeatherData(data);

    hideSpinner();
};

navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationFailure);