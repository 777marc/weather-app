const request = require('request');
const mapsKey = '{ google maps api key }';

const geocode = (address, callback) => {
  
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=${mapsKey}&address=${encodeURIComponent(address)}`,
    json: true
  }, (error, response, body) => {
  
    if(error) {
      callback('unable to connect to map server.');
    }
    else if(body.status === 'ZERO_RESULTS') {
      callback('unable to find address provided.');
    }
    else if(body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });

}

module.exports = {
  geocode
}
