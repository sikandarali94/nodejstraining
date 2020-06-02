const api = require('../api');
const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const coordinates = `${latitude},${longitude}`;
    const darkSkyUrl = `http://api.weatherstack.com/current?access_key=${api.WEATHER_STACK_API_KEY}&query=
        ${coordinates}`;
    request({ url: darkSkyUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Weather Stack.', undefined);
        } else if (response.body.error) {
            callback('Unable to find latitude and longitude.', undefined);
        } else {
            const { location, current } = response.body;

            const cityName = location.name;
            const forecast = current.weather_descriptions[0];
            callback(undefined, `In ${cityName}, the forecast is currently ${forecast}.`);
        }
    });
}

module.exports = forecast;