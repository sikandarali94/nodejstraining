/* 'npm init -y' answers yes to all the questions that the npm initialization process asks automatically. */
const api = require('./api');
/* request is a library that allows us to make HTTP requests easily. */
const request = require('request');

const url = `https://api.darksky.net/forecast/${api.API_KEY}/37.8267,-122.4233`;

request({ url }, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data.currently);
});