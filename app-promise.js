const yargs = require('yargs');
const axios = require('axios');
const { googleMapsApiKey, darkeyApiKey } = require('./keys/keys');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

  var mapsKey = googleMapsApiKey;
  var weatherKey = darkeyApiKey;
  var encodedAddress = encodeURIComponent(argv.address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${mapsKey}&address=${encodedAddress}`

  console.log(googleMapsApiKey);

  axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${weatherKey}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  }).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`it's currentlt ${temperature} but it feels like ${apparentTemperature}.`);
  }).catch((err) => {
    //console.log(err);
    if(err.code === 'ECONNREFUSED') {
      console.log('Unable to connect to API servers');
    }
    else {
      console.log(err.message);
    }
  });