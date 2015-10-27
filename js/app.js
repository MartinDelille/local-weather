var celciusFromKelvin = function(kelvin) {
  return Math.round((kelvin - 273.15) * 10) / 10 + ' ° C';
};

$(function() {
  var weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var today = new Date().getDay();
  for(var i = 1; i < 4; i++) {
    $('#week .col-md-4:nth-child(' + i + ') h3').text(weekday[(today + i) % 7]);
  }

  $.getJSON('http://ipinfo.io/', function(data) {
    $('#city').text(data.city);

    var token = 'eb2d3efe1c95bd690a3e7339b42e387c';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + data.city + ',' + data.country + '&appid=' + token;
    $.getJSON(url, function(data) {
      console.log(data);
      $('#today .temperature').text(celciusFromKelvin(data.main.temp));
      $('#today .weather').text(data.weather[0].main);
    });
  });
});
