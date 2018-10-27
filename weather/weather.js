const request = require('request');
const { darkeyApiKey } = require('../keys/keys');
const APIKey = darkeyApiKey;

const getWeather = (lat, lon, callback) => {

  request({
    url: `https://api.darksky.net/forecast/${APIKey}/${lat},${lon}`,
    json: true
  }, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      callback(undefined, {
        "temperature": body.currently.temperature,
        "apparentTemperature": body.currently.apparentTemperature
      })
    }
    else {
      callback('there was an issue getting the temperature');
    }
  }); 

}

module.exports = {
  getWeather
} 
