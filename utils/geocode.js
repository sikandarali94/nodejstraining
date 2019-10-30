const api = require('../api');
const request = require('request');

const geocode = (address, callback) => {
    /* encodeURIComponent() encodes special URL characters that actually mean something in a URL structure e.g. ?
    becomes %3F, & becomes %26 and so on. Please reference this: https://www.w3schools.com/tags/ref_urlencode.asp for
    URL encoding table. */
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${api.MAP_BOX_API_KEY}&limit=1`;

    request({ url: mapBoxUrl, json: true }, (error, response) => {
        if (error) {
            /* We can also write callback('Unable to connect to geo service.'); and data would be automatically passed
            undefined but it is good to be explicit. */
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