const request = require('request');

// const url =
//   'http://api.weatherstack.com/current?access_key=2f38e587aeddb44c61979b4f377e4855&query=New%20York&units=s';

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to weather service!');
//     console.log(error);
//   } else if (response.body.error) {
//     console.log(response.body.error.code, response.body.error.info);
//   } else {
//     const description = response.body.current.weather_descriptions[0];
//     const temperature = response.body.current.temperature;
//     const feelslike = response.body.current.feelslike;
//     console.log(
//       `${description}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out.`
//     );
//   }
// });

const forecast = (latitude, longitude, callback) => {
  const token = '2f38e587aeddb44c61979b4f377e4855';
  const url = `http://api.weatherstack.com/current?access_key=${token}&query=${latitude},${longitude}&units=s`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback(body, undefined);
    } else {
      const description = body.current.weather_descriptions[0];
      const { temperature, feelslike } = body.current;
      callback(
        undefined,
        `${description}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out.`
      );
    }
  });
};

module.exports = forecast;
