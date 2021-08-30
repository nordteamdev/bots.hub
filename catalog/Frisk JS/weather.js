var prequest = require('prequest')
var qs = require('querystring');
const weather = {
  'пасмурно':       ' 🌥', 
  'ясно':           '☀', 
  'слегка облачно': '⛅', 
  'дождь':          '🌧',
  'снег':           '🌨',
  'легкий дождь':   '🌧',
  'облачно':        '☁️'
}
function Weather(key){
 this.key = key
}

Weather.prototype.get = function(city) {
  var params = qs.stringify({
    appid: this.key,
    units: 'metric',
    type:  'accurate',
    lang:  'ru',
    q:     city
  });
  return new Promise((resolve, reject) => {
    prequest('http://api.openweathermap.org/data/2.5/weather?' + params).then((data) => {
      var _data = {
        country:  data.sys.country,
        press:    data.main.pressure,
        type:     data.weather[0].description,
        city:     data.name,
        temp:     Math.round(data.main.temp),
        wind:     data.wind.speed,
        humi:     data.main.humidity,
        smile:    weather[data.weather[0].description] || '',
        time:     (r) => {
          var date = new Date(data.sys[r]*1000);
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();
          return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        }
      }
      resolve(_data)
    }).catch((err) => {
      reject(err)
    });
  })
};

module.exports = Weather;