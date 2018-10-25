const request = require('request');
const mapsKey = 'AIzaSyAnSvVYhOreelLc7w7TNtLj3JDPNahy2S0';

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) =>{
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${mapsKey}&address=${encodeURIComponent(address)}`,
      json: true
    }, (error, response, body) => {
    
      if(error) {
        reject('unable to connect to map server.');
      }
      else if(body.status === 'ZERO_RESULTS') {
        reject('unable to find address provided.');
      }
      else if(body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });
  })
}


geocodeAddress('10627 Authors Way Orlando').then((res) => {
  console.log(JSON.stringify(res,undefined, 2));
}).catch((errorMessage) => {
  console.log('Error:',errorMessage);
});
