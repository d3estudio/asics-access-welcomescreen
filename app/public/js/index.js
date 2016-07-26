var socket = io();

socket.on('connected', function(socket) {
  console.log('connected');
});

socket.on('message', function(msg){
  var content = $('#content');
  var name = $('#name');
  var video = $('#video');

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

  setTimeout(function () {
    name.removeClass('show-name');
    name.addClass('hide-name');
    video.get(0).play();
    content.removeClass('show');
    content.addClass('hide');
    name.text('');
  }, 5000)
});
