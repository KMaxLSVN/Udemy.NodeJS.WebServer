const request = require('request');

const geocode = (address, callback) => {
  const token =
    'pk.eyJ1IjoibWF4MTIzMjEiLCJhIjoiY2xqZWU5c2hrMnpwNjNwcXkxdG9sb3ZsNiJ9.gFfUfsrdZ_aMi3XGQPtaxA';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${token}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to Mapbox service!');
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.');
    } else {
      const [longitude, latitude] = body.features[0].center;
      const { place_name: location } = body.features[0];
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
