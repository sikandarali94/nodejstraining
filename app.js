/* 'npm init -y' answers yes to all the questions that the npm initialization process asks automatically. */
const api = require('./api');
/* request is a library that allows us to make HTTP requests easily. */
const request = require('request');

const darkSkyUrl = `https://api.darksky.net/forecast/${api.DARK_SKY_API_KEY}/-33.868, 151.21?units=si`;
const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Sydney.json?access_token=${api.MAP_BOX_API_KEY}&limit=1`;

/* Setting 'json: true' automatically parses JSON response to a JS object. */
request({ url: darkSkyUrl, json: true }, (error, response) => {
    /* If there is an error on the API side, it might respond but it will not populate the error object being received
    by this callback function. Instead it will populate the response object with the error and below is how we have
    handled it (the way we handle it is different depending upon the API as evident with the map box API in the second
    request method). */
    if (error) {
        console.log('Unable to connect to weather service.');
    } else if (response.body.error) {
        console.log('Unable to find location.');
    } else {
        const { temperature, precipProbability } = response.body.currently;
        const { summary } = response.body.daily.data[0];
        console.log(`${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`);
    }
});

request({ url: mapBoxUrl, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to geo service.');
    } else if (response.body.features.length === 0) {
        console.log('Unable to find latitude and longitude.');
    } else {
        const [ longitude, latitude ] = response.body.features[0].center;
        console.log(`Latitude is: ${latitude}. Longitude is: ${longitude}`);
    }
});