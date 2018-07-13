import { Sunny, SunnyOvercast, Rain, Snow, Fog, ThunderStorm, Showers, Windy } from './images';
import { getElement } from './utils';

const getIcon = data => {
    let { id, temperature } = data;
    const isSunny = temperature >= 20;

    switch (true) {
        case id < 250:
            return {
                icon: ThunderStorm,
                alt: 'thunderstorm icon'
            };
        case id < 350:
            return {
                icon: Showers,
                alt: 'shower icon'
            };
        case id < 550:
            return {
                icon: Rain,
                alt: 'rain icon'
            };
        case id < 650:
            return {
                icon: Snow,
                alt: 'snow icon'
            };
        case id < 750:
            return {
                icon: Fog,
                alt: 'fog icon'
            };
        case id === 800 && !isSunny:
            return {
                icon: SunnyOvercast,
                alt: 'not so sunny icon'
            };
        case id === 800 && isSunny:
            return {
                icon: Sunny,
                alt: 'sunny icon'
            };
        default:
            return {
                icon: Windy,
                alt: 'shower icon'
            };
    }
}

const writeToDOM = (elSelector, content) => {
    const el = getElement(elSelector);
    el.innerHTML = content;
};

const writeCityName = data => writeToDOM(
    '#weather-title',
    `The weather in ${data.cityName} <br> ${data.country} is:`
);

const writeWeatherIcon = data => {
    const { icon, alt } = getIcon(data);

    writeToDOM(
        '#weather-icon',
        `
            <img class="weather-icon" src="${icon}" alt="${alt}"></img>             
            <span class="weather-description">&ldquo; ${data.description} &rdquo;</span>
        `
    );
};

const writeTemperature = data => writeToDOM(
    '#temperature',
    `Temperature: ${data.temperature.toFixed()}&#176;C`
);

const writeCloudCoverage = data => writeToDOM(
    '#cloud-coverage',
    `Cloud Coverage: ${data.cloudCoverage}%`
);

const writeHumidity = data => writeToDOM(
    '#humidity',
    `Humidity: ${data.humidity}%`
);

const writeError = (error) => {
    const el = getElement('#error-message');
    if (error) {
        el.classList.add('error');
        el.innerHTML = 'Unable to find city'
    } else {
        el.classList.remove('error');
        el.innerHTML = '';
    }
};

const writeWeatherData = data => {
    if (data) {
        writeError(false);
        writeWeatherIcon(data);
        writeCityName(data);
        writeTemperature(data);
        writeCloudCoverage(data);
        writeHumidity(data);
    } else {
        writeError(true);
    }
};

const getWeatherElements = () => {
    const spinner = getElement('#spinner');
    const weatherContainer = getElement('.weather-info-container');

    return { spinner, weatherContainer }
};

const showSpinner = () => {
    const { spinner, weatherContainer } = getWeatherElements();
    spinner.style.display = 'block';
    weatherContainer.style.display = 'none';
}

const hideSpinner = () => {
    const { spinner, weatherContainer } = getWeatherElements();
    spinner.style.display = 'none';
    weatherContainer.style.display = 'flex';
}

export { writeWeatherData, showSpinner, hideSpinner }