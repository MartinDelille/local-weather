$(function() {
  $.getJSON('http://ipinfo.io/', function(data) {
    $('#city').text(data.city);
  });
});
