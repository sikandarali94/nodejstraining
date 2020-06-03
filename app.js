const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2];

if (location) {
    geocode(location, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            /* By returning the console.log() statement, we are logging to the console as well as coming out of the
            function. */
            return console.log('Error', error);
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return console.log('Error', error);
            }
            console.log(location);
            console.log(forecastData);
        });
    });
} else {
    console.log('Location was not provided.');
}