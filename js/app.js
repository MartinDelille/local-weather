var temperatureFromKelvin = function(kelvin, fahrenheit) {
  var temperature = kelvin - 273.15;
  if(fahrenheit)
    temperature = temperature * 1.8 + 32;
  return Math.round(temperature * 10) / 10 + ' °' + (fahrenheit ? 'F' : 'C');
};

$(function() {
  var fahrenheit = false;
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

  var update = function() {
    $.getJSON('http://ipinfo.io/', function(data) {
        $('#city').text(data.city);

        var token = 'eb2d3efe1c95bd690a3e7339b42e387c';
        var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + data.city + ',' + data.country + '&appid=' + token;
        $.getJSON(url, function(data) {
          $('#today .temperature').text(temperatureFromKelvin(data.list[0].main.temp, fahrenheit));
          $('#today     .weather').text(data.list[0].weather[0].main);
          for(var i = 1; i < 4; i++) {
            $('#week .col-md-4:nth-child(' + i + ') .temperature').text(temperatureFromKelvin(data.list[8 * i].main.temp, fahrenheit));
            $('#week .col-md-4:nth-child(' + i + ') .weather').text(data.list[8 * i].weather[0].main);
          }
        });
    });
  };

  $('#unit a').bind('click', function() {
    fahrenheit = ! fahrenheit;
    if(fahrenheit)
      $('#unit a').text('Fahrenheit');
    else
      $('#unit a').text('Celsius');
    update();
  });

  update();
});
