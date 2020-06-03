const api = require('./api');
/* HTTP is a module for making HTTP protocol requests, while HTTPS module is used for making HTTPS protocol requests.
Both modules have a request() method for making the respective protocol calls. */

const http = require('http');

const weatherStackUrl = `http://api.weatherstack.com/current?access_key=${api.WEATHER_STACK_API_KEY}&query=
        -33.870453,151.208755`;

const request = http.request(weatherStackUrl, response => {
    let data = '';

    /* With response.on() we can register an event handler. In this case we are registering a callback for the 'data'
    event. 'data' event fires when new data is received from the URL. We store the data in a variable name named 'chunk'
    because we might receive the entire data or a piece of the data. chunk is stored as a buffer and we can use the
    toString() method to convert it to a string. */
    response.on('data', chunk => {
        data += chunk.toString();
    });

    /* The 'end' data is fired when the http request is over. It does not receive any arguments as shown below.
     */
    response.on('end', () => {
        const responseBody = JSON.parse(data);
        console.log(responseBody);
    });
});

request.on('error', error => {
    console.log('An error: ', error);
});

/* We need the end() method to be called for the HTTP request to complete properly. end() tells Node that we are done
setting up our request and that it can be fired off. */
request.end();
