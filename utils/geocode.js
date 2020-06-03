/* request is just an npm library, we do not actually need it to make HTTP requests, although it makes creating HTTP
requests a whole lot easier. */
const request = require('request');

const api = require('../api');

const geocode = (address, callback) => {
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${api.MAP_BOX_API_KEY}&limit=1`;

    request({ url: mapBoxUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geo service.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find latitude and longitude.', undefined);
        } else {
            const { place_name, center } = body.features[0];
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