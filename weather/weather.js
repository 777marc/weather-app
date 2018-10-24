const request = require('request');
const APIKey = '79e0e3cb0a57c6945845cf51ade5038a';

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