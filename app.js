const geocode = require('./utils/geocode');

// const darkSkyUrl = `https://api.darksky.net/forecast/${api.DARK_SKY_API_KEY}/-33.868, 151.21?units=si`;

/* With callback functions used in asynchronous manner, we typically see two arguments passed to callbacks: error (if
something went horrible) and data (if things went well). This is not enforced but it is a common convention. */
geocode('Sydney', (error, data) => {
    console.log('Error', error);
    console.log('Data', data);
});