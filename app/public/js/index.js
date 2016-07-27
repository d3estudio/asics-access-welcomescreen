var socket = io();
var nameTimeout;

socket.on('connected', function(socket) {
  console.log('connected');
});

socket.on('message', function(guestName){
  var content = $('#content');
  var name = $('#name');
  var welcome = $('#welcome-message');
  var video = $('#video');

  video.get(0).pause();
  video.get(0).currentTime = '0';

  clearTimeout(nameTimeout);

  resizeText();

  showNameContainer(guestName);

  nameTimeout = setTimeout(function () {
    name.removeClass('show-name');
    name.addClass('hide-name');

    welcome.addClass('hide-welcome');
    welcome.removeClass('show-welcome');

    video.get(0).play();

    hideContent();

  }, 5000)

});

function resizeText() {
  $('#name-container').textfill({
    debug: true,
    maxFontPixels: 1580
  });
}

function showNameContainer(guestName) {
  var content = $('#content');
  var name = $('#name');
  var welcome = $('#welcome-message');
  var video = $('#video');

  content.removeClass('hide');
  content.addClass('show');

  name.text(guestName);
  name.removeClass('hide-name');
  name.addClass('show-name');

  welcome.removeClass('hide-welcome');
  welcome.addClass('show-welcome');
}

function hideContent() {
  var content = $('#content');
  var name = $('#name');

  setTimeout(function () {
    name.text('');
    content.removeClass('show');
    content.addClass('hide');
  }, 300)

}
