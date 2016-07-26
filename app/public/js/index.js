var socket = io();

$(document).ready(function () {
  $('#content').hide();
});

socket.on('connected', function(socket) {
  console.log('connected');
});

socket.on('message', function(msg){
  var content = $('#content');
  var name = $('#name');
  var video = $('#video');

  video.get(0).pause();
  video.get(0).currentTime = '0';
  content.show();
  name.text(msg);

  setTimeout(function () {
    video.get(0).play();
    content.hide();
    name.text('');
  }, 5000)
});
