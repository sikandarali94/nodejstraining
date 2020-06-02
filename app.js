const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('Sydney', (error, data) => {
    console.log('Error', error);
    console.log('Data', data);
});

forecast(-75.7088, 44.1545, (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
})