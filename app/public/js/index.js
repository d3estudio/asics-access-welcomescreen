var socket = io();
var nameTimeout;

socket.on('connected', function(socket) {
  console.log('connected');
});

socket.on('message', function(msg){
  var content = $('#content');
  var name = $('#name');
  var welcome = $('#welcome-message');
  var video = $('#video');

  clearTimeout(nameTimeout);

  $('#name-container').textfill({
    debug: true,
    maxFontPixels: 1580
  });

  video.get(0).pause();
  video.get(0).currentTime = '0';

  content.removeClass('hide');
  content.addClass('show');

  name.text(msg);
  name.removeClass('hide-name');
  name.addClass('show-name');

  welcome.removeClass('hide-welcome');
  welcome.addClass('show-welcome');

  nameTimeout = setTimeout(function () {
    name.removeClass('show-name');
    name.addClass('hide-name');
    // name.text('');

    welcome.addClass('hide-welcome');
    welcome.removeClass('show-welcome');

    video.get(0).play();

    // content.removeClass('show');
    // content.addClass('hide');
  }, 5000)
});
