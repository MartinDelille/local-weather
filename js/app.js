var celciusFromKelvin = function(kelvin) {
  return Math.round((kelvin - 273.15) * 10) / 10 + ' ° C';
};

$(function() {
  var token = 'eb2d3efe1c95bd690a3e7339b42e387c';

  $.getJSON('http://ipinfo.io/', function(data) {
    $('#city').text(data.city);

    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + data.city + ',' + data.country + '&appid=' + token;
    $.getJSON(url, function(data) {
      console.log(data);
      $('#today .temperature').text(celciusFromKelvin(data.main.temp));
      $('#today .weather').text(data.weather[0].main);
    });
  });
});
