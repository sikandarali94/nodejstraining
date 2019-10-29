/* 'npm init -y' answers yes to all the questions that the npm initialization process asks automatically. */
const api = require('./api');
/* request is a library that allows us to make HTTP requests easily. */
const request = require('request');

const darkSkyUrl = `https://api.darksky.net/forecast/${api.DARK_SKY_API_KEY}/37.8267,-122.4233?units=si`;
const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${api.MAP_BOX_API_KEY}&limit=1`;

/* Setting 'json: true' automatically parses JSON response to a JS object. */
request({ url: darkSkyUrl, json: true }, (error, response) => {
    const { temperature, precipProbability } = response.body.currently;
    const { summary } = response.body.daily.data[0];
    console.log(`${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`);
});

request({ url: mapBoxUrl, json: true }, (error, response) => {
    const [ longitude, latitude ] = response.body.features[0].center;
    console.log(`Latitude is: ${latitude}. Longitude is: ${longitude}`);
});