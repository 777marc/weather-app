const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

  geocode.geocode(argv.address, (errorMessage, results) => {
    if(errorMessage) {
      console.log(errorMessage);
    }
    else {

      console.log(JSON.stringify(results, undefined, 2));

      weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {

        if(errorMessage) {
          console.log(errorMessage);
        }
        else {
          console.log(`Current Temp: ${weatherResults.temperature} Feels Like: ${weatherResults.apparentTemperature}`);
        }
        
      });

    }
  });

