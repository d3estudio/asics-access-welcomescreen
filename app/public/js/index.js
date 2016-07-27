var socket = io();
var showNameTimeout, hideContentTimeout;

$(function () {

  socket.on('connected', function (socket) {
    console.log('connected');
  });

  socket.on('message', function (guestName) {
    clearTimeout(showNameTimeout);

    var content = $('#content');
    var name = $('#name');
    var surname = $('#surname');
    var welcome = $('#welcome-message');
    var video = $('#video');

    var splitedName = guestName.split(" ");
    var firstName = splitedName[0];
    var secondName = splitedName[1];

    name.text(firstName);
    surname.text(secondName);

    video.get(0).pause();
    video.get(0).currentTime = '0';

    // resizeText(nameContainer, guestName);

    showNameContainer();

    showNameTimeout = setTimeout(function () {
      name.removeClass('show-name').addClass('hide-name');
      welcome.addClass('hide-welcome').removeClass('show-welcome');
      surname.addClass('hide-surname').removeClass('show-surname');

      video.get(0).play();

      // hideContent();

    }, 5000)

  });

  function showNameContainer() {
    var content = $('#content');
    var name = $('#name');
    var welcome = $('#welcome-message');
    var video = $('#video');
    var surname = $('#surname');

    content.removeClass('hide').addClass('show');
    name.removeClass('hide-name').addClass('show-name');
    welcome.removeClass('hide-welcome').addClass('show-welcome');
    surname.removeClass('hide-surname').addClass('show-surname');
  }

  function hideContent() {
    var content = $('#content');
    var name = $('#name');
    clearTimeout(hideContentTimeout);

    hideContentTimeout = setTimeout(function () {
      name.text('');
      content.removeClass('show').addClass('hide');
    }, 300)

  }

  function resizeText(el, text) {


  }

});