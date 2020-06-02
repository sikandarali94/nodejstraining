const api = require('../api');
const request = require('request');

const geocode = (address, callback) => {
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${api.MAP_BOX_API_KEY}&limit=1`;

    request({ url: mapBoxUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to geo service.', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find latitude and longitude.', undefined);
        } else {
            const { place_name, center } = response.body.features[0];
            const [ longitude, latitude ] = center;

            callback(undefined, {
                longitude,
                latitude,
                location: place_name
            });
        }
    });
};

module.exports = geocode;