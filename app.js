/* 'npm init -y' answers yes to all the questions that the npm initialization process asks automatically. */
const api = require('./api');
/* request is a library that allows us to make HTTP requests easily. */
const request = require('request');

const url = `https://api.darksky.net/forecast/${api.API_KEY}/37.8267,-122.4233?units=si`;

/* Setting 'json: true' automatically parses JSON response to a JS object. */
request({ url, json: true }, (error, response) => {
    const { temperature, precipProbability } = response.body.currently;
    const { summary } = response.body.daily.data[0];
    console.log(`${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`);
});